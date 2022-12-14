import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Location } from "../models/location.model";

@Injectable({providedIn: 'root'})
export class LocationService {

    protected apiURL = "localhost:7137/location"
    constructor(protected http: HttpClient) {
    }

    getAllLocations() {
        return this.http.get<Location[]>(`${this.apiURL}/getAllLocations`)
    }

    getLocation(id: number) {
        return this.http.get<Location>(`${this.apiURL}/getLocation/${id}`)
    }

    addLocation(location: Location) {
        return this.http.post(`${this.apiURL}/addLocation`, location)
    }
}