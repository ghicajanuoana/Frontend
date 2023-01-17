import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { DeviceTypes } from "../models/device-type.model";
import { ConfigService } from "./configuration.service"
import { header } from "./global.service";

@Injectable({ providedIn: 'root' })
export class DeviceTypeService {

  protected apiURL: string = "";
  constructor(protected http: HttpClient, private config: ConfigService) {
    if (config.serverSettings) {
      this.apiURL = `${config.serverSettings.webApiUrl}DeviceTypes`;
    }
  }

  addDeviceType(deviceType: DeviceTypes) {
    return this.http.post(`${this.apiURL}/addDeviceTypes`, deviceType, header);
  }

  checkDeleteDeviceTypeIsUsed(id:number) {
    return this.http.get(`${this.apiURL}/checkDeviceType/${id}`, header);
  }

  deleteDeviceType(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.delete(`${this.apiURL}/deleteById/${id}`, { headers, responseType: 'text'});
  }

  getAllDeviceTypes() {
      return this.http.get<DeviceTypes[]>(`${this.apiURL}`, header)
  }

  getDeviceTypeById(id: number){
      return this.http.get<DeviceTypes>(`${this.apiURL}/getDeviceType/${id}`,  header)
  }

  updateDeviceType(deviceType: DeviceTypes){
      return this.http.put<DeviceTypes>(`${this.apiURL}/updateDeviceTypes`, deviceType, header)
  }
}