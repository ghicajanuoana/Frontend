import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceReadingTypesService } from 'src/app/services/device-reading-types.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDeviceReadingTypeDialogComponent implements OnInit {
  addDeviceReadingTypeForm!: FormGroup;
  dialogStatus: string = "closed";
  showError: boolean = false;
  @Input() deviceReadingType: any;

  constructor(public dialogRef: MatDialogRef<EditDeviceReadingTypeDialogComponent>,
    public deviceReadingTypeService: DeviceReadingTypesService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addDeviceReadingTypeForm = this.formBuilder.group({
      name: [""],
      unit: [""]
    })
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }

  get addDeviceReadingType(): any {
    return this.addDeviceReadingTypeForm.controls;
  }

  updateDeviceReading(): void {
    if (this.addDeviceReadingType.name.value != "") {
      this.deviceReadingType.name = this.addDeviceReadingType.name.value;
    }
    if (this.addDeviceReadingType.unit.value != "") {
      this.deviceReadingType.unit = this.addDeviceReadingType.unit.value;
    }

    this.deviceReadingTypeService.updateDeviceReadingType(this.deviceReadingType).subscribe({
      next: () => {
        this.deviceReadingTypeService.updateDeviceReadingType(this.deviceReadingType);
        this.dialogRef.close(this.dialogStatus);
      },
      error: (e) => {
        if (e.status == 400) { this.showError = true; }
      }
    })

    this.dialogRef.close();
  }
}

