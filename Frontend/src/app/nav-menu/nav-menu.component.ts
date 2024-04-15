import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent implements OnInit {
  isSidenavOpened = true;
  @Output() showNavbarEvent = new EventEmitter<boolean>();
  @Input() alerts: any;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  showNavbar() {
    this.isSidenavOpened = !this.isSidenavOpened;
    this.showNavbarEvent.emit(this.isSidenavOpened);
  }

  goToAlerts() {
    this.router.navigate(['/alerts']);
  }
}