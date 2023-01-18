import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Devices } from '../../models/device.model';
import { DeviceService } from '../../services/device.service';
import { ConfirmationDialogComponent } from '../device-type/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  devices: Devices[] = []

  currentDevice: any;

  columnsToDisplay: string[] = ["name", "serialNumber", "description", "imagePath", "deviceType", "location", "actions"];

  constructor(public router: Router,
    public deviceService: DeviceService,
    public dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDevices();
  }

  getDevices() {
    this.deviceService.getAllDevices().subscribe({
      next: resp => {
        this.devices = resp;
      },
      error: error => {
        this.toastr.error(error.message);
      }
    })
    this.devices.sort((a, b) => a.name.localeCompare(b.name));
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
