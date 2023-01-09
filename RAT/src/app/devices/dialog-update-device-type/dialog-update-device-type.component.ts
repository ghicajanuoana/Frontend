import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';
import { DeviceTypeService } from 'src/app/services/device-type.service';

@Component({
  selector: 'app-dialog-update-device-type',
  templateUrl: './dialog-update-device-type.component.html',
  styleUrls: ['./dialog-update-device-type.component.css']
})
export class DialogUpdateDeviceTypeComponent implements OnInit {

  updateForm!: FormGroup;
  @Input() deviceType: any;

  constructor(public dialogRef: MatDialogRef<DialogUpdateDeviceTypeComponent>, public deviceTypeService: DeviceTypeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      name: ["", Validators.required],
    })
  }

  get form(): any {
    return this.updateForm.controls;
  }

  save() {
    if (this.updateForm.valid) {
      if (this.form.name.value != "") {
        this.deviceType.name = this.form.name.value;
      }
      this.deviceTypeService.updateDeviceType(this.deviceType).subscribe({
        next: () => {
          this.deviceTypeService.updateDeviceType(this.deviceType)
          this.dialogRef.close();
        },
        error: (e) => {
          console.log(e);
        }
      })
    }
  }

  close() {
    this.dialogRef.close();
  }
}
