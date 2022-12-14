import { Component, OnInit } from '@angular/core';
import { Location } from '../models/location.model';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  location: Location = new Location();
  parentItem: string = "Location is parent";

  locations: Location[] = [
    { id: 1, name: 'Location1', country: 'Ro', city: 'Cluj-Napoca', emailAlertsActive: true },
    { id: 2, name: 'Location2', country: 'Ro', city: 'Cluj-Napoca', emailAlertsActive: true },
    { id: 3, name: 'Location3', country: 'Ro', city: 'Bucuresti', emailAlertsActive: true },
    { id: 4, name: 'Location4', country: 'Uk', city: 'Londra', emailAlertsActive: true },
    { id: 5, name: 'Location5', country: 'Uk', city: 'Coventry', emailAlertsActive: true },
    { id: 6, name: 'Location6', country: 'Ro', city: 'Cluj-Napoca', emailAlertsActive: true },
    { id: 7, name: 'Location7', country: 'Uk', city: 'Londra', emailAlertsActive: true },
    { id: 8, name: 'Location8', country: 'Ro', city: 'Bucuresti', emailAlertsActive: true },
  ];

  columnsToDisplay: string[] = ["id","name", "country", "city", "emailAlertsActive"];

  constructor(private locationService: LocationService) {
  }

  doSmtgWithDataFromChild(value: string) {
    console.log("did we recive data?")
    console.log(value)
  }

  ngOnInit(): void {
    this.getLocations();
  } 

  getLocations() {
    this.locationService.getAllLocations().subscribe({
      next: resp => {
        this.locations = resp;
      },
      error: error => {
        console.log(error)
      }
    })
  }
}
