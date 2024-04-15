import { Component, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../devices/device-type/confirmation-dialog/confirmation-dialog.component';
import { DeleteConfirmationComponent } from '../devices/device-type/delete-confirmation/delete-confirmation.component';
import { Location } from '../models/location.model';
import { LocationService } from '../services/location.service';
import { LocationParameters } from '../models/location-parameters.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  columnsToDisplay: string[] = ["name", "country", "city", "address", "contactEmail", "actions"];
  locations: MatTableDataSource<any> = new MatTableDataSource<any>();
  locationParameters: LocationParameters = new LocationParameters();
  currentLocation: any;
  orderBy = "Name";
  orderDescending = false;
  pageIndex = 0;
  pageSize = 5;
  length: number
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private locationService: LocationService, private dialog: MatDialog, private toastr: ToastrService, private router: Router) {
    this.locationParameters.pageNumber = this.pageIndex;
    this.locationParameters.pageSize = this.pageSize;
    this.locationParameters.orderBy = this.orderBy;
    this.locationParameters.orderDescending = this.orderDescending;
  }

  ngOnInit(): void {
    this.getLocations();
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  getLocations() {
    this.locationService.getLocationsPagedAndFiltered(this.locationParameters)
      .subscribe((response) => {
        this.locations.data = response.data;
        this.pageIndex = response.currentPage;
        this.pageSize = response.pageSize;
        this.length = response.totalCount;
      });
  }

  filterLocations() {
    this.locationParameters.pageNumber = 0;
    this.pageIndex = 0;
    this.getLocations();
  }

  sortData(headerName: string) {
    if (headerName) {
      this.locationParameters.orderDescending = this.locationParameters.orderDescending === false ? true : false;
      this.locationParameters.orderBy = headerName;
      this.getLocations();
    }
  }

  isSorting(name: string) {
    return this.locationParameters.orderBy === name;
  };

  pageChangeEvent(event: PageEvent) {
    this.locationParameters.pageSize = event.pageSize;
    this.locationParameters.pageNumber = event.pageIndex;
    this.getLocations();
  }

  onDelete(location: any): void {
    this.checkDeleteLocation(location.locationId, location);
  }

  checkDeleteLocation(id: number, location: any): void {
    this.locationService.checkDeleteLocationIsUsed(id).subscribe({
      next: () => {
        // this.deviceFound = false;
        const dialogRef = this.dialog.open(ConfirmationDialogComponent);
        dialogRef.componentInstance.message = "Are you sure you want to delete this location?";
        this.currentLocation = location;
        dialogRef.afterClosed().subscribe(result => {
          if (result == true)
            this.deleteLocation();
        });
      },
      error: () => {
        const dialogRef = this.dialog.open(DeleteConfirmationComponent);
        dialogRef.componentInstance.message = "This location is in use, please remove it from all devices!";
        dialogRef.componentInstance.title = "Location in use!"
      }
    });
  }

  deleteLocation() {
    this.locationService.deleteLocation(this.currentLocation.locationId).subscribe(
      {
        next: resp => {
          this.getLocations();
          this.toastr.info(resp);
        },
        error: error => {
          this.toastr.error(error.message);
        }
      }
    );
  }
}
