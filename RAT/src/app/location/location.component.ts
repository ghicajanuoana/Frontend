import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../devices/device-type/confirmation-dialog/confirmation-dialog.component';
import { DeleteConfirmationComponent } from '../devices/device-type/delete-confirmation/delete-confirmation.component';
import { Location } from '../models/location.model';
import { LocationParams } from '../models/locationparameters.model';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  location: Location = new Location();
  locations: Location[] = [];
  columnsToDisplay: string[] = ["name", "country", "city", "address", "contactEmail", "actions"];
  locationsParameters: LocationParams;
  currentLocation: any;
  pageIndex = 0;
  pageSize = 5;
  length: number
  pageSizeOptions: number[] = [5, 10, 25, 100];
  dataSource: MatTableDataSource<any> = new MatTableDataSource()
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private locationService: LocationService,
    private dialog: MatDialog) {
    this.locationsParameters = {
      pageSize: this.pageSize,
      pageNumber: this.pageIndex
    }
  }

  ngOnInit(): void {
    this.getAllLocations();
  }

  getAllLocations() {
    this.locationService.getAllLocationsPaged(this.locationsParameters)
      .subscribe((response) => {
        this.dataSource.data = response.data;
        this.pageIndex = response.currentPage;
        this.pageSize = response.pageSize;
        this.length = response.totalCount;
      });
  }

  pageChangeEvent(event: PageEvent) {
    this.locationsParameters.pageSize = event.pageSize;
    this.locationsParameters.pageNumber = event.pageIndex;
    this.getAllLocations();
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
          this.getAllLocations();
        },
        error: error => {
          console.log("device type not found");
        }
      }
    );
  }
}



