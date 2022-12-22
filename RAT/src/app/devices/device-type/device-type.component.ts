import { Component, OnInit } from '@angular/core';
import { DeviceTypes } from 'src/app/models/device-type.model';
import { Router } from '@angular/router';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { Console } from 'console';

@Component({
  selector: 'app-device-type',
  templateUrl: './device-type.component.html',
  styleUrls: ['./device-type.component.css']
})
export class DeviceTypeComponent implements OnInit {

  deviceTypes: DeviceTypes[] = []
  columnsToDisplay: string[] = ["name"];

  constructor(public router: Router, public deviceTypeService: DeviceTypeService) { }

  ngOnInit(): void {
    this.getDeviceTypes();
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

  showClicked(row: any) {
  }

}
