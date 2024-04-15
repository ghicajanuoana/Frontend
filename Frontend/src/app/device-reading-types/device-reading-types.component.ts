import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeviceReadingType } from '../models/device-reading-types';
import { DeviceReadingTypesService } from '../services/device-reading-types.service';
import { DeviceReadingTypeDialogComponent } from './device-reading-type-dialog/device-reading-type-dialog.component';
import { ConfirmationDialogComponent } from '../devices/device-type/confirmation-dialog/confirmation-dialog.component';
import { DeleteConfirmationComponent } from '../devices/device-type/delete-confirmation/delete-confirmation.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-device-reading-types',
  templateUrl: './device-reading-types.component.html',
  styleUrls: ['./device-reading-types.component.css']
})

export class DeviceReadingTypesComponent implements OnInit, AfterViewInit {

  deviceReadingTypes: DeviceReadingType[] = []
  columnsToDisplay: string[] = ["name", "actions"];
  dialogStatus: string = "closed";
  dataSource: MatTableDataSource<any> = new MatTableDataSource<DeviceReadingType>();
  @ViewChild(MatSort) sort: MatSort;
  nameFilter = new FormControl();
  //unitFilter = new FormControl();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  name!: string;
  //unit!: string;

  filteredValues = {
    name: ''
    // unit: ''
  };

  constructor(public router: Router,
    public deviceReadingTypeService: DeviceReadingTypesService,
    public dialog: MatDialog,
    private toastr: ToastrService) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getDeviceReadingTypes();

    this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
      this.filteredValues.name = nameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    // this.unitFilter.valueChanges.subscribe((unitFilterValue) => {
    //   this.filteredValues.unit = unitFilterValue;
    //   this.dataSource.filter = JSON.stringify(this.filteredValues);
    // });

    this.dataSource.filterPredicate = this.customFilterPredicate();
    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => data[sortHeaderId].toLocaleLowerCase();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(DeviceReadingTypeDialogComponent,
      {
        data: { deviceReadingType: { name: this.name }, isEditMode: false, dialogTitle: "Add device reading type" }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDeviceReadingTypes();
      }
    });
  }

  openUpdateDialog(deviceReadingType: DeviceReadingType): void {
    const dialogRef = this.dialog.open(DeviceReadingTypeDialogComponent,
      {
        data: { deviceReadingType: deviceReadingType, isEditMode: true, dialogTitle: "Edit device reading type" }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDeviceReadingTypes();
      }
    });
  }

  getDeviceReadingTypes() {
    this.deviceReadingTypeService.getAllDeviceReadingTypes().subscribe({
      next: resp => {
        this.deviceReadingTypes = resp;
        this.dataSource.data = resp;
      },
      error: error => {
        this.toastr.error(error.message);
      }
    });
    this.dataSource.data.sort((a, b) => a.name.localeCompare(b.name));
  }

  openConfirmationDialog(deviceReadingType: any): void {
    this.checkDeviceTypeIsUsed(deviceReadingType.deviceReadingTypeId, deviceReadingType);
  }

  checkDeviceTypeIsUsed(id: number, device: any): void {
    this.deviceReadingTypeService.checkDeleteDeviceReadingTypeIsUsed(id).subscribe({
      next: resp => {
        if (resp == false) {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent);
          dialogRef.componentInstance.message = "Are you sure you want to delete this device reading type?";
          dialogRef.afterClosed().subscribe(result => {
            if (result == true)
              this.deleteDeviceReadingType(device);
          });
        }
        else {
          const dialogRef = this.dialog.open(DeleteConfirmationComponent);
          dialogRef.componentInstance.message = "This device reading type is in use, please remove it from all devices!";
          dialogRef.componentInstance.title = "Device reading type in use!"
        }
      },
      error: error => {
        this.toastr.error(error.error);
      }
    });
  }

  deleteDeviceReadingType(deviceReadingType: DeviceReadingType): void {
    this.deviceReadingTypeService.deleteDeviceReadingType(deviceReadingType.deviceReadingTypeId as number).subscribe({
      next: resp => {
        this.getDeviceReadingTypes();
        this.toastr.info(resp);
      },
      error: error => {
        if (error.status === 701) {
          this.toastr.error(error.error);
        }
      }
    });
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: DeviceReadingType, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      return (
        data.name
          .toString()
          .trim()
          .toLocaleLowerCase()
          .indexOf(searchString.name.toLocaleLowerCase()) !== -1 
        //   &&
        // data.unit
        //   .toString()
        //   .trim()
        //   .toLocaleLowerCase()
        //   .indexOf(searchString.unit.toLocaleLowerCase()) !== -1
      );
    };

    return myFilterPredicate;
  }
}
