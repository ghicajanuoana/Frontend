import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Threshold } from "../models/threshold.model";
import { ConfigService } from "./configuration.service"
import { header } from "./global.service";

@Injectable({ providedIn: 'root' })
export class ThresholdsService {

    protected apiURL: string = "";
    
    constructor(protected http: HttpClient, private config: ConfigService) {
        if (config.serverSettings) {
            this.apiURL = `${config.serverSettings.webApiUrl}Threshold`;
        }
    }

    getAllThresholds() {
        return this.http.get<Threshold[]>(`${this.apiURL}/getAllThresholds`, header)
    }
}