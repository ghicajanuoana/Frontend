import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent implements OnInit {
  isSidenavOpened = true;
  @Output() showNavbarEvent = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void {
  }

  showNavbar() {
    this.isSidenavOpened = !this.isSidenavOpened;
    this.showNavbarEvent.emit(this.isSidenavOpened);
  }
}