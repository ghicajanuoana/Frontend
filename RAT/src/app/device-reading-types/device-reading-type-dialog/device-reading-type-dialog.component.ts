import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DeviceReadingType } from 'src/app/models/device-reading-types';
import { DeviceReadingTypesService } from 'src/app/services/device-reading-types.service';

@Component({
  selector: 'app-device-reading-type-dialog',
  templateUrl: './device-reading-type-dialog.component.html',
  styleUrls: ['./device-reading-type-dialog.component.css']
})
export class DeviceReadingTypeDialogComponent implements OnInit {

  showError: boolean = false;
  addDeviceReadingTypeForm!: FormGroup;
  dialogStatus: string = "closed";

  constructor(
    public dialogRef: MatDialogRef<DeviceReadingTypeDialogComponent>,
    public deviceReadingTypeService: DeviceReadingTypesService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.addDeviceReadingTypeForm = this.formBuilder.group({
      name: ["", Validators.required],
      unit: [""]
    })
  }

  onCancelClick(): void {
    this.dialogRef.close('closed');
  }

  get addDeviceReadingType(): any {
    return this.addDeviceReadingTypeForm.controls;
  }

  createDeviceReadingType() {
    if (this.addDeviceReadingTypeForm.valid) {
      let deviceReadingType: DeviceReadingType = {
        name: this.addDeviceReadingType.name.value,
        unit: this.addDeviceReadingType.unit.value
      }

      this.deviceReadingTypeService.addDeviceReadingType(deviceReadingType).subscribe({
        next: () => {
          this.deviceReadingTypeService.addDeviceReadingType(deviceReadingType);
          this.dialogRef.close(this.dialogStatus);
        },
        error: (e) => {
          if (e.status == 400) { this.showError = true; }
        }
      })
    }
  }
}

