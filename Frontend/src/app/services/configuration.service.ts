import { HttpBackend, HttpClient } from "@angular/common/http"
import { Injectable, isDevMode } from "@angular/core"
import { IConfiguration } from "../models/interfaces/configuration.interface";
import { lastValueFrom } from 'rxjs';
import { CONFIG_URL, CONFIG_URL_PROD } from "../app.globals";

@Injectable()
export class ConfigService {

    private httpClient: HttpClient;
    public serverSettings?: IConfiguration;

    constructor(handler: HttpBackend) {
        this.httpClient = new HttpClient(handler);
    }

    public async loadConfigurations() {
        const baseURL = isDevMode() ? CONFIG_URL : CONFIG_URL_PROD
        return lastValueFrom(this.httpClient.get<IConfiguration>(baseURL))
            .then((response) => {
                this.serverSettings = response as IConfiguration;
            })
            .finally(() => {
                if (this.serverSettings != undefined) {
                    this.serverSettings.webApiUrl = this.normalizeUrl(this.serverSettings.webApiUrl);
                    this.serverSettings.signalRUrl = this.normalizeUrl(this.serverSettings.signalRUrl);
                }
            });
    }

    private normalizeUrl(url: string): string {
        return url.endsWith('/') ? url : `${url}/`;
    }
}