import { Component, Inject } from '@angular/core';
import { DeviceTypes } from '../../../models/device-type.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeviceTypeService } from '../../../services/device-type.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-device-type',
  templateUrl: './dialog-device-type.component.html',
  styleUrls: ['./dialog-device-type.component.css']
})
export class DialogDeviceTypeComponent {
  dialogStatus: string = "closed";
  deviceTypeName: string;
  //deviceTypeUnit: string;
  deviceTypeId: any;

  constructor(
    public dialogRef: MatDialogRef<DialogDeviceTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { deviceType: DeviceTypes, isEditMode: boolean, dialogTitle: string },
    public deviceTypeService: DeviceTypeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.deviceTypeName = this.data.deviceType.name;
    //this.deviceTypeUnit = this.data.deviceType.unit;
    this.deviceTypeId = this.data.deviceType.deviceTypeId;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  dialogSave(deviceTypes: { deviceTypeId: number, name: string, unit: string }) {
    deviceTypes.name = this.deviceTypeName;
    //deviceTypes.unit = this.deviceTypeUnit;
    if (!this.data.isEditMode) {
      this.deviceTypeService.addDeviceType(deviceTypes).subscribe({
        next: () => {
          this.toastr.success("Device type successfully added!");
          this.dialogRef.close(this.dialogStatus);
        },
        error: error => {
          if (error.status == 700) {
            this.toastr.error(error.error);
          }
        }
      })
    }
    else {
      deviceTypes.deviceTypeId = this.deviceTypeId;
      this.deviceTypeService.updateDeviceType(deviceTypes).subscribe({
        next: () => {
          this.toastr.success("Device type successfully updated!");
          this.dialogRef.close(this.dialogStatus);
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
