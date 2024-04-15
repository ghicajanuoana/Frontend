import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from '../devices/device-type/confirmation-dialog/confirmation-dialog.component';
import { Role } from '../models/role.model';
import { UserParameters } from '../models/user-parameters.model';
import { User } from '../models/user.model';
import { UserAdd } from '../models/useradd.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  columnsToDisplay: string[] = ["username", "roleType", "isActive", "actions"];
  users: MatTableDataSource<any> = new MatTableDataSource<any>();
  userParameters: UserParameters = new UserParameters();
  orderBy = "Username";
  orderDescending = false;
  pageIndex = 0;
  pageSize = 5;
  length: number;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  editing: boolean;
  statusUpdate: boolean;
  verify: boolean;
  u?: string = "";
  r?: Role;
  uId?: number;
  a?: boolean;
  userverify: User;
  RoleTypes: any[] = [
    { roleType: 'Admin', value: 1 },
    { roleType: 'User', value: 2 },
    { roleType: 'Operator', value: 3 },
    { roleType: 'Observer', value: 4 }
  ];

  constructor(public router: Router,
    public userService: UserService,
    public dialog: MatDialog,
    private toastr: ToastrService) {
    this.userParameters.pageNumber = this.pageIndex;
    this.userParameters.pageSize = this.pageSize;
    this.userParameters.orderBy = this.orderBy;
    this.userParameters.orderDescending = this.orderDescending;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  getUsers() {
    this.userService.getUsersPagedAndFiltered(this.userParameters).subscribe({
      next: response => {
        this.users.data = response.data;
        this.pageIndex = response.currentPage;
        this.pageSize = response.pageSize;
        this.length = response.totalCount;
      },
      error: error => {
        this.toastr.error(error.message);
      }
    });
  }

  sortData(headerName: string) {
    if (headerName) {
      this.userParameters.orderDescending = this.userParameters.orderDescending === false ? true : false;
      this.userParameters.orderBy = headerName;
      this.getUsers();
    }
  }

  isSorting(name: string) {
    return this.userParameters.orderBy === name;
  };

  filterUsers() {
    this.userParameters.pageNumber = 0;
    this.pageIndex = 0;
    this.getUsers();
  }

  pageChangeEvent(event: PageEvent) {
    this.userParameters.pageSize = event.pageSize;
    this.userParameters.pageNumber = event.pageIndex;
    this.getUsers();
  }

  deleteUser(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.message = "Are you sure you want to delete this user ?";
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
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

  verifyUpdate(user: User) {
    this.userService.getUserById(user.userId).subscribe()
    this.u = user.username;
    this.r = user.role;
    this.uId = user.userId;
    this.a = user.isActive;
  }

  updateEditableField(user: User) {
    this.editing = false;
    let userUpdated: UserAdd = {
      userId: user.userId,
      username: user.username,
      roleId: user.role?.id,
      isActive: user.isActive
    }

    if (this.u == user.username && this.r == user.role && this.uId == user.userId && this.a == user.isActive)
      this.verify = false;
    else
      this.verify = true;

    if (this.statusUpdate == true) {
      userUpdated.isActive = !user.isActive;
      this.statusUpdate = false;
    }

    this.userService.updateUser(userUpdated).subscribe({
      next: () => {
        if (this.verify == true)
          this.toastr.success("User successfully updated!");
        this.getUsers();
      },
      error: error => {
        this.toastr.error(error.error.Message);
      }
    });
  }
}