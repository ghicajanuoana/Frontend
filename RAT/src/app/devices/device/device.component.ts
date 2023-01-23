import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Devices } from '../../models/device.model';
import { DeviceService } from '../../services/device.service';
import { ConfirmationDialogComponent } from '../device-type/confirmation-dialog/confirmation-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { DeviceParameters } from 'src/app/models/device-parameters.model';
import { PageEvent } from '@angular/material/paginator';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  currentDevice: any;
  columnsToDisplay: string[] = ["name", "serialNumber", "description", "imagePath", "deviceType", "location", "actions"];
  devices: MatTableDataSource<any> = new MatTableDataSource<any>();
  deviceParameters: DeviceParameters = new DeviceParameters();
  orderBy = "Name";
  orderDescending = false;
  pageIndex = 0;
  pageSize = 5;
  length: number
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(public router: Router, public deviceService: DeviceService, public dialog: MatDialog, private toastr: ToastrService) {
    this.deviceParameters.pageNumber = this.pageIndex;
    this.deviceParameters.pageSize = this.pageSize;
    this.deviceParameters.orderBy = this.orderBy;
    this.deviceParameters.orderDescending = this.orderDescending;
  }

  ngOnInit(): void {
    this.getDevices();
  }

  openImageDialog(index: number) {
    let tableItem = this.devices.data[index];
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      data: {
        image: tableItem.imageBytes
      }
    });
    console.log(tableItem)
  }

  getDevices() {
    this.deviceService.getDevicesPagedAndFiltered(this.deviceParameters)
      .subscribe((response) => {
        this.devices.data = response.data;
        this.pageIndex = response.currentPage;
        this.pageSize = response.pageSize;
        this.length = response.totalCount;
      });
  }

  filterDevices() {
    this.deviceParameters.pageNumber = 0;
    this.pageIndex = 0;
    this.getDevices();
  }

  sortData(headerName: string) {
    if (headerName) {
      this.deviceParameters.orderDescending = this.deviceParameters.orderDescending === false ? true : false;
      this.deviceParameters.orderBy = headerName;
      this.getDevices();
    }
  }

  isSorting(name: string) {
    return this.deviceParameters.orderBy === name;
  };

  pageChangeEvent(event: PageEvent) {
    this.deviceParameters.pageSize = event.pageSize;
    this.deviceParameters.pageNumber = event.pageIndex;
    this.getDevices();
  }

  onDelete(device: any): void {
    this.deleteDevice(device.deviceId, device);
  }

  deleteDevice(id: number, device: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.message = "Are you sure you want to delete this device ?";
    this.currentDevice = device;
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.deleteDeviceConfirmed();
    });
  }

  deleteDeviceConfirmed(): void {
    this.deviceService.deleteDevice(this.currentDevice.deviceId).subscribe({
      next: resp => {
        this.getDevices();
        this.toastr.info(resp);
      },
      error: error => {
        this.toastr.error(error.error.Message);
      }
    });
  }
}
