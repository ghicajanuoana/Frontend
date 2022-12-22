import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Devices } from '../../models/device.model';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  devices: Devices[] = []
  columnsToDisplay: string[] = ["id", "name"];

  constructor(public router: Router, public deviceService: DeviceService) { }

  ngOnInit(): void {
    this.getDevices();
  }

  getDevices() {
    this.deviceService.getAllDevices().subscribe({
      next: resp => {
        this.devices = resp;
      },
      error: error => {
        console.log(error)
      }
    })
  }

  gotoLocation() {
    this.router.navigate(["/location"])
  }
}
