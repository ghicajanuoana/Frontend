import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/models/role.model';
import { UserAdd } from 'src/app/models/useradd.model';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  addEditUserForm!: FormGroup;
  allRoles: Role[] = [];
  userId: any;
  isEditMode: boolean;
  user: UserAdd = new UserAdd();

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private roleService: RoleService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {
    this.getAllRoles();
    
    this.userId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = this.route.snapshot.data['isEditMode'];

    if (this.isEditMode) {
      this.getUserById();
    }

    this.addEditUserForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.email]],
      role: ["", Validators.required],
      isActive: [true, Validators.required],
    })
  }

  get addUser(): any {
    return this.addEditUserForm.controls;
  }

  addEditUser() {
    if (this.addEditUserForm.valid) {
      let user: UserAdd = {
        userId: !this.isEditMode ? 0 : this.userId,
        username: this.addUser.username.value,
        isActive: this.addUser.isActive.value,
        roleId: this.addUser.role.value,
      }
      
      if (!this.isEditMode) {
        this.userService.addUser(user).subscribe(
          {
          next: () => {
            this.toastr.success("User successfully added!");
            this.router.navigate(['/users']);
          },
          error: (e) => {
            if (e.status === 700) {
              this.toastr.error(e.error);
            }
          }
        });
      } 
      else {
        this.userService.updateUser(user).subscribe({
          next: () => {
            this.toastr.success("User successfully updated!");
            this.router.navigate(['/users']);
          },
          error: (e) => {
            if (e.status === 702 || e.status === 700) {
              this.toastr.error(e.error);
            }
          }
        });
      }
    }
  }

  private getAllRoles(): void {
    this.roleService.getAllRoles().subscribe({
      next: resp => {
        this.allRoles = resp;
      },
      error: error => {
        this.toastr.error(error.message);
      }
    })
  }

  getUserById() {
    this.userService.getUser(this.userId).subscribe({
      next: resp => {
        this.user = {
          userId: resp.userId,
          username: resp.username,
          roleId: resp.roleId,
          isActive: resp.isActive
        }
      },
      error: (e) => {
        if (e.status === 702) {
          this.toastr.error(e.error);
        }
      }
    })
  }

  compareIds(o1: any, o2: any) {
    return (o1 == o2) ? true : false;
  }
}
