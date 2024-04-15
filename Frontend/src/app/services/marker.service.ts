import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  capitals: string = '/assets/data/capitals.geojson';

  greenPin = L.icon({
    iconSize: [21, 41],
    iconUrl: 'assets/images/greenPin.png'
  });

  //locationName: String = "Petrosani";

  constructor(private http: HttpClient) {
  }

  private getPopupContent(locationName: String): any {
    const popup = L.popup().setContent(
      "<p style='font-weight: bold'> " + locationName + "</p>"
    );

    return popup;
  }

  makeCapitalMarkers(map: L.Map): void {
    this.http.get(this.capitals).subscribe((res: any) => {
      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const location = c.properties.name;
        const marker = L.marker([lat, lon],
          {
           title: "Location device"
          }
          );

        marker.addTo(map).bindPopup(this.getPopupContent(location));
      }
    });
  }
}