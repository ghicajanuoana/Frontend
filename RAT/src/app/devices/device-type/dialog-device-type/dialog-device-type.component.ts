import { Component, Inject, OnInit } from '@angular/core';
import { DeviceTypes } from '../../../models/device-type.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeviceTypeService } from '../../../services/device-type.service';

@Component({
  selector: 'app-dialog-device-type',
  templateUrl: './dialog-device-type.component.html',
  styleUrls: ['./dialog-device-type.component.css']
})
export class DialogDeviceTypeComponent {
  showError: boolean = false;
  dialogStatus: string = "closed";
  deviceTypeName: string;
  deviceTypeId: any;

  constructor(
    public dialogRef: MatDialogRef<DialogDeviceTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { deviceType: DeviceTypes, isEditMode: boolean, dialogTitle: string },
    public deviceTypeService: DeviceTypeService,
  ) { }

  ngOnInit(): void {
    this.deviceTypeName = this.data.deviceType.name;
    this.deviceTypeId = this.data.deviceType.deviceTypeId;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  dialogSave(deviceTypes: { deviceTypeId: number, name: string }) {
    deviceTypes.name = this.deviceTypeName;
    if (!this.data.isEditMode) {
      this.deviceTypeService.addDeviceType(deviceTypes).subscribe({
        next: resp => {
          this.dialogRef.close(this.dialogStatus);
        },
        error: error => {
          console.log(error)
          if (error.status == 700) { this.showError = true; }
        }
      })
    }
    else {
      deviceTypes.deviceTypeId = this.deviceTypeId;
      this.deviceTypeService.updateDeviceType(deviceTypes).subscribe({
        next: resp => {
          this.dialogRef.close(this.dialogStatus);
        },
        error: error => {
          if (error.status == 409) { this.showError = true; }
        }
      })
    }
  }
}
