import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeviceReadingType } from '../models/device-reading-types';
import { ConfigService } from './configuration.service';
import { header } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceReadingTypesService {

  protected apiURL: string = "";
  constructor(protected http: HttpClient, private config: ConfigService) {
    if (config.serverSettings) {
      this.apiURL = `${config.serverSettings.webApiUrl}deviceReadingType`;
    }
  }

  getAllDeviceReadingTypes() {
    return this.http.get<DeviceReadingType[]>(`${this.apiURL}/getAllDeviceReadingTypes`, header)
  }

  addDeviceReadingType(deviceReadingType: DeviceReadingType) {
    return this.http.post(`${this.apiURL}/addDeviceReadingType`, deviceReadingType, header);
  }

  updateDeviceReadingType(deviceReadingType: DeviceReadingType) {
    return this.http.put(`${this.apiURL}/updateDeviceReadingType`, deviceReadingType, header);
  }

  checkDeleteDeviceReadingTypeIsUsed(id:number) {
    return this.http.get(`${this.apiURL}/checkDeviceReadingType/${id}`, header);
  }

  deleteDeviceReadingType(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.delete(`${this.apiURL}/${id}`, { headers, responseType: 'text'});
  }
}
