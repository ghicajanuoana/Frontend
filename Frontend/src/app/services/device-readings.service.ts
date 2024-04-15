import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MarkAlertAsRead } from '../models/marked-alert-as-read.model';
import { ConfigService } from './configuration.service';
import { header } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceReadingsService {
  protected apiURL: string = "";

  constructor(protected http: HttpClient, private config: ConfigService) {
    if (this.config.serverSettings) {
      this.apiURL = `${this.config.serverSettings.webApiUrl}DeviceReading`;
    }
  }

  markAlertsAsRead(ids: MarkAlertAsRead) {
    return this.http.put(`${this.apiURL}/alertRead`, ids, header);
  }
}
