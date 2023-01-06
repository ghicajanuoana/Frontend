import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../devices/device-type/confirmation-dialog/confirmation-dialog.component';
import { DeleteConfirmationComponent } from '../devices/device-type/delete-confirmation/delete-confirmation.component';
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

  currentLocation: any;

  columnsToDisplay: string[] = ["name", "country", "city", "address", "contactEmail", "actions"];

  constructor(private locationService: LocationService,
    private dialog: MatDialog) {
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

  onDelete(location: any): void {
    this.checkDeleteLocation(location.locationId, location);
  }

  checkDeleteLocation(id: number, location: any): void {
    if (location.isLocationUsed === true) {
      const dialogRef = this.dialog.open(DeleteConfirmationComponent);
      dialogRef.componentInstance.message = "There are devices assigned to this location, please remove all devices in the location first";
      dialogRef.componentInstance.title = "Location in use!"
    }
    else {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent);
      dialogRef.componentInstance.message = "Are you sure you want to delete this location?";
      this.currentLocation = location;
      dialogRef.afterClosed().subscribe(result => {
        if (result == true)
          this.deleteLocation();
      });
    }
  }

  deleteLocation() {
    this.locationService.deleteLocation(this.currentLocation.locationId).subscribe(
      {
        next: resp => {
          this.getLocations();
        },
        error: error => {
          console.log("device type not found");
        }
      }
    );
  }
}



