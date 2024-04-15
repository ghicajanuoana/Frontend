import { Component, OnInit } from '@angular/core';
import { UnreadAlertsService } from '../services/unread-alerts.service';

@Component({
  selector: 'app-dashoard',
  templateUrl: './dashoard.component.html',
  styleUrls: ['./dashoard.component.css']
})

export class DashoardComponent implements OnInit {

  opened = true;
  //unreadAlerts: any;

  constructor() { }

  ngOnInit() {
    //this.unreadAlertsService.startConnection();
    //this.receiveUnreadAlertCount();
  }

  showNavbar(isOpened: any) {
    this.opened = isOpened;
  }

  // receiveUnreadAlertCount = () => {
  //   this.unreadAlertsService.hubConnection.on('ReceiveUnreadAlertCount', resp => {
  //     this.unreadAlerts = resp;
  //   });
  // }

}
