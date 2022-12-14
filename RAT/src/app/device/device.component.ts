import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  gotoLocation() {
    this.router.navigate(["/location"])
  }
}
