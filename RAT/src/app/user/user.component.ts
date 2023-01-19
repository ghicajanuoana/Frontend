import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from '../devices/device-type/confirmation-dialog/confirmation-dialog.component';
import { User } from '../models/user.model';
import { UserAdd } from '../models/useradd.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  users: User[] = []
  columnsToDisplay: string[] = ["username", "role", "isActive", "actions"];

  constructor(public router: Router,
    public userService: UserService,
    public dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe({
      next: resp => {
        this.users = resp;
      },
      error: error => {
        this.toastr.error(error.message);
      }
    })
  }

  deleteUser(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.message = "Are you sure you want to delete this user ?";
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
      {
        this.userService.deleteUser(id).subscribe({
          next: resp => {
            this.getUsers();
            this.toastr.info(resp);
          },
          error: error => {
            this.toastr.error(error.error.Message);
          }
        });
      }
    });
  }
 
  validate(user: User) {
    let userUpdated: UserAdd = {
      userId: user.userId,
      username: user.username,
      roleId: user.role?.id,
    }
    userUpdated.isActive = !user.isActive
    user.isActive = !user.isActive
    this.userService.updateUser(userUpdated).subscribe(
      {
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (e) => {
          if (e.status === 702 || e.status === 700) {
            this.toastr.error(e.error);
          }
        }
      }
    )
  }
}