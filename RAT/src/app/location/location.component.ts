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
 
  locations: Location[] = [];

  columnsToDisplay: string[] = ["name", "country", "city", "address","contactEmail"];

  constructor(private locationService: LocationService) {
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
    this.locations.sort((a, b) => a.name.localeCompare(b.name));
  }
}
