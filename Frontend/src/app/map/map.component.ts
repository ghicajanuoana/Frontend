import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  @Output() latitudeEvent = new EventEmitter<number>();
  @Output() longitudeEvent = new EventEmitter<number>();
  @Input() lat: number | undefined;
  @Input() lng: number | undefined;

  private map: any;
  currentLat: number = 0;
  currentLng: number = 0;
  marker: any;
  pinsLayer = L.layerGroup();

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private async initMap(): Promise<void> {
    try {
      await this.getCurrentPosition();
    } catch (err) {
      this.currentLat = 45.843615;
      this.currentLng = 24.969258;
    }
    this.map = L.map('map', {
      center: [this.currentLat, this.currentLng],
      zoom: 15,
      worldCopyJump: true
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
    });

    tiles.addTo(this.map);
    const icon = {
      icon: L.icon({
        iconSize: [41, 41],
        iconAnchor: [20.5, 41],
        iconUrl: 'assets/images/marker.png'
      })
    };

    if (this.lat != undefined && this.lng != undefined) {
      this.marker = L.marker([this.lat, this.lng], { icon: icon.icon, draggable: true }).addTo(this.pinsLayer);
      this.pinsLayer.addTo(this.map);
      this.map.setView([this.lat, this.lng], 10);
    }

    this.map.on('click', (e: any) => {
      //this.pinsLayer.clearLayers();
      this.marker = L.marker([e.latlng.lat, e.latlng.lng], { icon: icon.icon, draggable: true }).addTo(this.pinsLayer);
      this.pinsLayer.addTo(this.map);
      this.lat = e.latlng.lat;
      this.latitudeEvent.emit(this.lat);
      this.lng = e.latlng.lng;
      this.longitudeEvent.emit(this.lng);
      this.marker.on('drag', (e: any) => {
          this.lat = e.latlng.lat;
          this.latitudeEvent.emit(this.lat);
          this.lng = e.latlng.lng;
          this.longitudeEvent.emit(this.lng);
      })
      //added new
      this.marker.on('click', (e:any) => {
          this.pinsLayer.clearLayers();
      })
    });

    if (this.marker != undefined) {
      this.marker.on('drag', (e: any) => {
        this.lat = e.latlng.lat;
        this.latitudeEvent.emit(this.lat);
        this.lng = e.latlng.lng;
        this.longitudeEvent.emit(this.lng);
      })
    }
  }

  getCurrentPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        this.currentLat = resp.coords.latitude;
        this.currentLng = resp.coords.longitude;
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });
  }
}
