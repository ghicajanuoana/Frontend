import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToLoginPage(){
    this.router.navigate(['/login']);
  }

  goToSignPage(){
    this.router.navigate(['/user']);
  }

  goToAdminPage(){
    this.router.navigate(['/loginAdmin']);
  }

}
