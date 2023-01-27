import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { ToastrService } from 'ngx-toastr';
import { DashboardMap } from '../models/dashboard-map.model';
import { MaintenanceService } from '../services/maintenance.service';

@Component({
  selector: 'app-dashboard-map',
  templateUrl: './dashboard-map.component.html',
  styleUrls: ['./dashboard-map.component.css']
})

export class DashboardMapComponent implements AfterViewInit {
  private map: L.Map;
  dashboardMap: DashboardMap[] = [];
  marker: any;
  redPinsLayer = L.layerGroup();
  amberPinsLayer = L.layerGroup();
  greenPinsLayer = L.layerGroup();
  greyPinsLayer = L.layerGroup();
  bluePinsLayer = L.layerGroup();

  bluePin = L.icon({
    iconSize: [35, 35],
    iconUrl: 'assets/images/marker.png'
  });
  redPin = L.icon({
    iconSize: [41, 35],
    iconUrl: 'assets/images/redPin.png'
  });
  amberPin = L.icon({
    iconSize: [41, 41],
    iconUrl: 'assets/images/amberPin.png'
  });
  greenPin = L.icon({
    iconSize: [21, 41],
    iconUrl: 'assets/images/greenPin.png'
  });
  greyPin = L.icon({
    iconSize: [50, 41],
    iconUrl: 'assets/images/greyPin.png'
  })

  private initMap(): void {
    this.map = L.map('map', {
      center: [40, 40],
      zoom: 1
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
    });

    tiles.addTo(this.map);

    this.redPinsLayer.addTo(this.map);
    this.amberPinsLayer.addTo(this.map);
    this.greenPinsLayer.addTo(this.map);
    this.greyPinsLayer.addTo(this.map);
    this.bluePinsLayer.addTo(this.map);
  }

  constructor(private maintenanceService: MaintenanceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDashboardMap();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private getPopupContent(redCount: number, amberCount: number, greenCount: number, greyCount: number, locationName: string): any {
    const popup = L.popup().setContent(
      "<p style='font-weight: bold'> " + locationName + "</p>" +
      "<p>Scheduled Services:</p>" +
      "<p style='color: red'>Immediate Service(<1 month): " + redCount + "</p>" +
      "<p style='color: orange'>Upcomig Service(1-3 months): " + amberCount + "</p>" +
      "<p style='color: green'>Future Service(>3 months): " + greenCount + "</p>" +
      "<p style='color: grey'>No service information: " + greyCount
    );

    return popup;
  }

  private getDashboardMap(): void {
    this.maintenanceService.getDashboardMap().subscribe({
      next: resp => {
        this.dashboardMap = resp;
        this.dashboardMap.forEach(element => {
          if (element.redCount > 0) {
            this.marker = L.marker([element.latitude, element.longitude], { icon: this.redPin }).bindPopup(this.getPopupContent(element.redCount, element.amberCount, element.greenCount, element.greyCount, element.locationName)).addTo(this.redPinsLayer);
          }
          else if (element.amberCount > 0) {
            this.marker = L.marker([element.latitude, element.longitude], { icon: this.amberPin }).bindPopup(this.getPopupContent(element.redCount, element.amberCount, element.greenCount, element.greyCount, element.locationName)).addTo(this.amberPinsLayer);
          }
          else if (element.greenCount > 0) {
            this.marker = L.marker([element.latitude, element.longitude], { icon: this.greenPin }).bindPopup(this.getPopupContent(element.redCount, element.amberCount, element.greenCount, element.greyCount, element.locationName)).addTo(this.greenPinsLayer);
          }
          else if (element.redCount == 0 && element.amberCount == 0 && element.greenCount == 0 && element.greyCount == 0) {
            this.marker = L.marker([element.latitude, element.longitude], { icon: this.bluePin }).bindPopup(this.getPopupContent(element.redCount, element.amberCount, element.greenCount, element.greyCount, element.locationName)).addTo(this.bluePinsLayer);
          }
          else {
            this.marker = L.marker([element.latitude, element.longitude], { icon: this.greyPin }).bindPopup(this.getPopupContent(element.redCount, element.amberCount, element.greenCount, element.greyCount, element.locationName)).addTo(this.greyPinsLayer);
          }
        });
      },
      error: error => {
        this.toastr.error(error.message);
      }
    })
  }
}