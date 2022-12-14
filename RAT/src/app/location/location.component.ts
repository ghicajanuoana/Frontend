import { Component, OnInit } from '@angular/core';
import { Location } from '../models/location.model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  locations: Location[] = []
  location: Location = new Location();

  constructor() {
    this.location.city = "Cluj"
    this.location.country = "Ro"
    this.location.id = 1
    this.location.emailAlertsActive = true
   }

  ngOnInit(): void {
    this.locations.push(this.location)
  } 
}
