import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Console } from "console";
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
}