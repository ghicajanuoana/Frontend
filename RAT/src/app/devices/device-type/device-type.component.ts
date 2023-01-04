import { Component, OnInit } from '@angular/core';
import { DeviceTypes } from 'src/app/models/device-type.model';
import { Router } from '@angular/router';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeviceTypeComponent } from '../../dialog-device-type/dialog-device-type.component';

@Component({
  selector: 'app-device-type',
  templateUrl: './device-type.component.html',
  styleUrls: ['./device-type.component.css']
})
export class DeviceTypeComponent implements OnInit {

  deviceTypes: DeviceTypes[] = []
  columnsToDisplay: string[] = ["name"];

  name!: string;

  constructor(public router: Router, public deviceTypeService: DeviceTypeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getDeviceTypes();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogDeviceTypeComponent,
      {
        data: { name: this.name }
      });

    dialogRef.afterClosed().subscribe(result => {     
      if (result) {
        this.getDeviceTypes();
      }
    });
  }

  getDeviceTypes() {
    this.deviceTypeService.getAllDeviceTypes().subscribe({
      next: resp => {
        this.deviceTypes = resp;
      },
      error: error => {
        console.log(error)
      }
    })
  }

}
