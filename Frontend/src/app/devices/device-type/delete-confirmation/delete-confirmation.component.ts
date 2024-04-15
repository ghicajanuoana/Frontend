import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeviceTypeService } from '../../../services/device-type.service';
import { DeviceTypes } from '../../../models/device-type.model';
import { DeviceService } from '../../../services/device.service';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent {

  @Input() message: string = "";
  @Input() title: string = "";

  constructor(public dialogRef: MatDialogRef<DeleteConfirmationComponent>) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
