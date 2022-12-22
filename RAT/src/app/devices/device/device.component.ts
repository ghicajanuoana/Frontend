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

  columnsToDisplay: string[] = ["name", "serialNumber", "description", "imagePath", "deviceType", "location"];

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
    this.devices.sort((a, b) => a.name.localeCompare(b.name));
  }
}
