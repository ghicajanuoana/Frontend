import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Location } from "../models/location.model";
import { ConfigService } from "./configuration.service";
import { header } from "./global.service";

@Injectable({ providedIn: 'root' })
export class LocationService {

  protected apiURL: string = "";
  constructor(protected http: HttpClient, private config: ConfigService) {
    if (config.serverSettings) {
      this.apiURL = `${config.serverSettings.webApiUrl}location`;
    }
  }

  getAllLocations() {
    return this.http.get<Location[]>(`${this.apiURL}/getAllLocations`, header)
  }

  getLocation(id: number) {
    return this.http.get<Location>(`${this.apiURL}/getLocation/${id}`, header)
  }

  addLocation(location: Location) {
    return this.http.post(`${this.apiURL}/addLocation`, location, header)
  }

  deleteLocation(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`, header)
  }
}
