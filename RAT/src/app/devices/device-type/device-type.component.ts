import { Component, OnInit } from '@angular/core';
import { DeviceTypes } from 'src/app/models/device-type.model';
import { Router, RouterModule } from '@angular/router';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogDeviceTypeComponent } from '../../dialog-device-type/dialog-device-type.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { DialogUpdateDeviceTypeComponent } from '../dialog-update-device-type/dialog-update-device-type.component';


@Component({
  selector: 'app-device-type',
  templateUrl: './device-type.component.html',
  styleUrls: ['./device-type.component.css']
})
export class DeviceTypeComponent implements OnInit {

  deviceTypes: DeviceTypes[] = []
  columnsToDisplay: string[] = ["name", "actions"];
  rowSelected: any;
  name!: string;
  deviceFound: boolean = false;
  currentDeviceType: any;

  constructor(public router: Router, public deviceTypeService: DeviceTypeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getDeviceTypes();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogDeviceTypeComponent,
      {
        data: { name: this.name }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDeviceTypes();
      }
    });
  }

  getDeviceTypes() {
    this.deviceTypeService.getAllDeviceTypes().subscribe({
      next: resp => {
        this.deviceTypes = resp;
      },
      error: error => {
        console.log(error)
      }
    })
  }

  openConfDialog(device: any): void {
    this.checkDeviceTypeIsUsed(device.deviceTypeId, device);
  }

  selectedRow(row: any) {
    this.rowSelected = row;
  }

  checkDeviceTypeIsUsed(id: number, device: any): void {
    this.deviceTypeService.checkDeleteDeviceTypeIsUsed(id).subscribe({
      next: resp => {
        this.deviceFound = false;
        const dialogRef = this.dialog.open(ConfirmationDialogComponent);
        dialogRef.componentInstance.message = "Are you sure you want to delete this device type?";
        this.currentDeviceType = device;
        dialogRef.afterClosed().subscribe(result => {
          if (result == true)
            this.deleteDeviceType();
        });
      },
      error: error => {
        const dialogRef = this.dialog.open(DeleteConfirmationComponent);
        dialogRef.componentInstance.message = "This device type is in use, please remove it from all devices!";
        dialogRef.componentInstance.title = "Device type in use!"
      }
    });
  }

  deleteDeviceType(): void {

    this.deviceTypeService.DeleteDeviceType(this.currentDeviceType.deviceTypeId).subscribe({
      next: resp => {
        this.getDeviceTypes();
      },
      error: error => {
        console.log("device type not found");
      }
    });
  }

  openUpdateDialog(deviceType: any): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(DialogUpdateDeviceTypeComponent, dialogConfig);
    dialogRef.componentInstance.deviceType = deviceType;
  }
}