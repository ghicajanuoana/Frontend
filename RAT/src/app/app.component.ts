import { Component, OnInit } from '@angular/core';
import { UnreadAlertsService } from './services/unread-alerts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'RAT';
  opened = true;
  unreadAlerts: any;

  constructor(private unreadAlertsService: UnreadAlertsService) { }

  ngOnInit() {
    this.unreadAlertsService.startConnection();
    this.receiveUnreadAlertCount();
  }

  showNavbar(isOpened: any) {
    this.opened = isOpened;
  }

  receiveUnreadAlertCount = () => {
    this.unreadAlertsService.hubConnection.on('ReceiveUnreadAlertCount', resp => {
      this.unreadAlerts = resp;
    });
  }
}