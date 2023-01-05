import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Devices } from "../models/device.model"
import { ConfigService } from "./configuration.service"
import { header } from "./global.service";

@Injectable({ providedIn: 'root' })
export class DeviceService {

    protected apiURL: string = "";
    constructor(protected http: HttpClient, private config: ConfigService) {
        if (config.serverSettings) {
            this.apiURL = `${config.serverSettings.webApiUrl}Device`;
        }
    }

    getAllDevices() {
        return this.http.get<Devices[]>(`${this.apiURL}/getAllDevices`, header)
    }

    getDevice(id: number) {
        return this.http.get<Devices>(`${this.apiURL}/getDevice/${id}`, header)
    }

    addDevice(device: Devices) {
        return this.http.post(`${this.apiURL}/AddDevice`, device, header)
    }
}
