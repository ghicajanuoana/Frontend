import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  addDeviceReadingTypeForm!: FormGroup;
  dialogStatus: string = "closed";

  constructor(
    public dialogRef: MatDialogRef<DeviceReadingTypeDialogComponent>,
    public deviceReadingTypeService: DeviceReadingTypesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { deviceReadingType: DeviceReadingType, isEditMode: boolean, dialogTitle: string }
  ) { }

  ngOnInit(): void {
    this.addDeviceReadingTypeForm = this.formBuilder.group({
      name: [this.data.deviceReadingType.name, Validators.required],
      unit: [this.data.deviceReadingType.unit]
    })
  }

  onCancelClick(): void {
    this.dialogRef.close('closed');
  }

  get addDeviceReadingType(): any {
    return this.addDeviceReadingTypeForm.controls;
  }

  dialogSave(deviceReadingType: { deviceReadingTypeId: number, name: string, unit: string }) {
    if (!this.data.isEditMode) {
      this.deviceReadingTypeService.addDeviceReadingType(deviceReadingType).subscribe({
        next: resp => {
          this.dialogRef.close(this.dialogStatus);
          this.toastr.success("Device reading type succesfully added!");
        },
        error: error => {
          console.log(error);
          if (error.status == 400) {
            this.toastr.error(error.error)
          }
        },
      })
    }
    else {
      this.data.deviceReadingType.name = deviceReadingType.name;
      this.data.deviceReadingType.unit = deviceReadingType.unit;
      this.deviceReadingTypeService.updateDeviceReadingType(this.data.deviceReadingType).subscribe({
        next: resp => {
          this.dialogRef.close(this.dialogStatus);
          this.deviceReadingTypeService.getAllDeviceReadingTypes();
          this.toastr.success("Device reading type succesfully saved!");
        },
        error: error => {
          console.log(error);
          if (error.status == 400) {
            this.toastr.error(error.error)
          }
        }
      })
    }
  }
}