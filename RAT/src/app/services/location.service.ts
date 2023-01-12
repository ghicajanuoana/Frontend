import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Location } from "../models/location.model";
import { ConfigService } from "./configuration.service";
import { header } from "./global.service";
import { LocationPaged } from "../models/paged-list.model";
import { LocationParams } from "../models/locationparameters.model";

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
    return this.http.get<Location>(`${this.apiURL}/${id}`, header)
  }

  addLocation(location: Location) {
    return this.http.post<Location>(`${this.apiURL}/addLocation`, location, header)
  }

  updateLocation(location: Location) {
    return this.http.put<Location>(`${this.apiURL}/updateLocation`, location, header)
  }

  deleteLocation(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`, header)
  }

  getAllLocationsPaged(locationParameters:LocationParams){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageNumber", String(locationParameters.pageNumber));
    queryParams = queryParams.append("pageSize", String(locationParameters.pageSize));
    return this.http.get<LocationPaged>(`${this.apiURL}/getLocationsPagedAndFiltered?${queryParams}`, header)
  }
}
