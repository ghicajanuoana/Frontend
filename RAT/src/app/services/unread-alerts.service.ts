import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class UnreadAlertsService {
  hubConnection: signalR.HubConnection;
  protected signalRURL: string = "";

  constructor(private toastr: ToastrService, private config: ConfigService) {
    if (this.config.serverSettings) {
      this.signalRURL = `${this.config.serverSettings.signalRUrl}alertCount`;
    }
  }

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.signalRURL, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        this.getUnreadAlertCount();
      })
      .catch(err => this.toastr.error(err));
  }

  getUnreadAlertCount = () => {
    this.hubConnection.invoke('GetUnreadAlertCount');
  }
}
