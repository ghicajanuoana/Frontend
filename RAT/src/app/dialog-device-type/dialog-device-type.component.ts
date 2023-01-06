import { Component, Inject, OnInit } from '@angular/core';
import { DeviceTypes } from '../models/device-type.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeviceTypeService } from '../services/device-type.service';

@Component({
  selector: 'app-dialog-device-type',
  templateUrl: './dialog-device-type.component.html',
  styleUrls: ['./dialog-device-type.component.css']
})
export class DialogDeviceTypeComponent implements OnInit {
  showError: boolean = false;
  dialogStatus: string = "closed";

  constructor(
    public dialogRef: MatDialogRef<DialogDeviceTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeviceTypes,
    public dialogService: DeviceTypeService,
  ) { }

  ngOnInit(): void {
    this.dialogCreate;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  dialogCreate(deviceTypes: { id: number, name: string }) {
    this.dialogService.addDeviceType(this.data).subscribe({
      next: resp => {
        this.dialogRef.close(this.dialogStatus);
       },
      error: error =>
      {console.log(error)
       if (error.status == 700) { this.showError = true; }
      }
    })
  }
}
