import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from '../helpers/validationform';
import { UserAdd } from '../models/useradd.model';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { RoleService } from '../services/role.service';
import { Role } from '../models/role.model';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  public loginForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  user: UserAdd;  
  allRoles: Role[] = [];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private roleService: RoleService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getAllRoles();
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     console.log(this.loginForm.value);
  //     this.auth.login(this.loginForm.value).subscribe({
  //       next: (user: UserAdd) => {
  //         this.toastr.success("Login succes");
  //         this.router.navigate(['/dashboard']);
  //       },
  //       error: (err) => {
  //         this.toastr.error("Username or password is wrong!");
  //         console.log(err);
  //       },
  //     });
  //   } else {
  //     ValidateForm.validateAllFormFields(this.loginForm);
  //   }
  // }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username; 
      const userId = 1;
  
      if (username === 'o' || username === 'oana' || username === 'ghicajanuoana') {
        console.log(this.loginForm.value);
        this.auth.login(this.loginForm.value).subscribe({
          next: (user: User) => {
            this.toastr.success("Login successful");
            this.router.navigate(['/users']);
          },
          error: (err) => {
            this.toastr.error("Username or password is wrong!");
            console.log(err);
          },
        });
      } 
      else {
        this.toastr.error("You need log in as an admin!");
      }
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
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

  compareIds(o1: any, o2: any) {
    return (o1 == o2) ? true : false;
  }

}
