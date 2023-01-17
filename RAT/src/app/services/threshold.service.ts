import { HttpClient, HttpHeaders } from "@angular/common/http"
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

    addThreshold(threshold: Threshold) {
        return this.http.post(`${this.apiURL}/addThreshold`, threshold, header)
    }

    deleteThreshold(id: number) {
        const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
        return this.http.delete(`${this.apiURL}/${id}`, { headers, responseType: 'text'});
    }
}