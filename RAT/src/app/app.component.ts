import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'RAT';
  opened = true;

  showNavbar(isOpened: any) {
    this.opened = isOpened;
  }
}