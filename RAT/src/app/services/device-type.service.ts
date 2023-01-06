import { HttpClient } from "@angular/common/http"
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

  getAllDeviceTypes() {
    return this.http.get<DeviceTypes[]>(`${this.apiURL}`, header)
  }

  addDeviceType(deviceType: DeviceTypes) {
    return this.http.post(`${this.apiURL}/addDeviceTypes`, deviceType, header);
  }

  checkDeleteDeviceTypeIsUsed(id:number) {
    return this.http.get(`${this.apiURL}/checkDeviceType/${id}`, header);
  }

  DeleteDeviceType(id: number) {
    return this.http.delete(`${this.apiURL}/deleteById/${id}`, header);
  }
}
