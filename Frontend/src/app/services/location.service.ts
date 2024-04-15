import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Location } from "../models/location.model";
import { ConfigService } from "./configuration.service";
import { header } from "./global.service";
import { LocationParameters } from "../models/location-parameters.model";
import { PagedList } from "../models/paged-list.model";

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

  getLocationsPagedAndFiltered(locationParameters: LocationParameters) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pagingFilteringParameters.pageNumber", String(locationParameters.pageNumber));
    queryParams = queryParams.append("pagingFilteringParameters.pageSize", locationParameters.pageSize);
    queryParams = queryParams.append("name", String(locationParameters.name));
    queryParams = queryParams.append("country", String(locationParameters.country));
    queryParams = queryParams.append("city", String(locationParameters.city));
    queryParams = queryParams.append("address", String(locationParameters.address));
    queryParams = queryParams.append("contactEmail", String(locationParameters.contactEmail));
    queryParams = queryParams.append("pagingFilteringParameters.orderBy", String(locationParameters.orderBy));
    queryParams = queryParams.append("pagingFilteringParameters.orderDescending", String(locationParameters.orderDescending));
    return this.http.get<PagedList>(`${this.apiURL}/getLocationsPagedAndFiltered?${queryParams}`, header)
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
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.delete(`${this.apiURL}/${id}`, { headers, responseType: 'text' })
  }

  checkDeleteLocationIsUsed(id:number) {
    return this.http.get(`${this.apiURL}/checkLocation/${id}`, header);
  }
}
