import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeviceReadingType } from 'src/app/models/device-reading-types';
import { DeviceReadingTypesService } from 'src/app/services/device-reading-types.service';

@Component({
  selector: 'app-device-reading-type-dialog',
  templateUrl: './device-reading-type-dialog.component.html',
  styleUrls: ['./device-reading-type-dialog.component.css']
})
export class DeviceReadingTypeDialogComponent implements OnInit {

  dialogStatus: string = "closed";
  deviceReadingTypeName: string;
  //deviceReadingTypeUnit: string;
  deviceReadingTypeId: any;

  constructor(
    public dialogRef: MatDialogRef<DeviceReadingTypeDialogComponent>,
    public deviceReadingTypeService: DeviceReadingTypesService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { deviceReadingType: DeviceReadingType, isEditMode: boolean, dialogTitle: string }
  ) { }

  ngOnInit(): void {
    this.deviceReadingTypeName = this.data.deviceReadingType.name;
    this.deviceReadingTypeId = this.data.deviceReadingType.deviceReadingTypeId;
  }

  onCancelClick(): void {
    this.dialogRef.close('closed');
  }

  dialogSave(deviceReadingType: { deviceReadingTypeId: number, name: string, unit: string }) {

    deviceReadingType.name = this.deviceReadingTypeName;

    if (!this.data.isEditMode) {
      this.deviceReadingTypeService.addDeviceReadingType(deviceReadingType).subscribe({
        next: () => {
          this.dialogRef.close(this.dialogStatus);
          this.toastr.success("Device reading type succesfully added!");
        },
        error: error => {
          if (error.status === 700) {
            this.toastr.error(error.error)
          }
        },
      })
    }
    else {
      deviceReadingType.deviceReadingTypeId = this.deviceReadingTypeId;
      this.deviceReadingTypeService.updateDeviceReadingType(deviceReadingType).subscribe({
        next: () => {
          this.dialogRef.close(this.dialogStatus);
          this.toastr.success("Device reading type succesfully saved!");
        },
        error: error => {
          if (error.status === 702 || error.status === 700) {
            this.toastr.error(error.error);
          }
        }
      })
    }
  }
}