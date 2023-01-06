import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeviceTypeService } from '../../../services/device-type.service';
import { DeviceTypes } from '../../../models/device-type.model';
import { DeviceService } from '../../../services/device.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { DeviceTypeComponent } from '../device-type.component';


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {

  @Input() message: string = "";

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onClickSubmit() {
    this.dialogRef.close(true);
  }
}
