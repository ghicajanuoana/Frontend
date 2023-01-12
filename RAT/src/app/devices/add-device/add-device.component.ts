import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';
import { Devices } from 'src/app/models/device.model';
import { LocationService } from 'src/app/services/location.service';
import { Location } from 'src/app/models/location.model';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { DeviceTypes } from 'src/app/models/device-type.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  allLocations: Location[] = [];
  allDeviceTypes: DeviceTypes[] = [];
  errorMessage: string = "";

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private router: Router, private deviceService: DeviceService,
    private locationService: LocationService, private deviceTypeService: DeviceTypeService) {
  }

  addDeviceForm = new FormGroup({
    name: new FormControl(''),
    serialNumber: new FormControl(''),
    deviceType: new FormControl(''),
    location: new FormControl(''),
    softwareVersion: new FormControl(''),
    firmwareVersion: new FormControl(''),
    alias: new FormControl(''),
    emails: new FormControl(''),
    imagePath: new FormControl(''),
    description: new FormControl('')

  })

  ngOnInit(): void {
    this.getAllLocations();
    this.getAllDeviceTypes();
    this.addDeviceForm = this.formBuilder.group({
      name: ["", Validators.required],
      emails: ["", Validators.email],
      location: ["", Validators.required],
      deviceType: ["", Validators.required],
      serialNumber: ["", Validators.required],
      softwareVersion: [""],
      firmwareVersion: [""],
      alias: [""],
      imagePath: [""],
      description: [""],

    })
  }

  private getAllLocations(): void {
    this.locationService.getAllLocations().subscribe({
      next: resp => {
        this.allLocations = resp;
      },
      error: error => {
        console.log(error);
      }
    })
  }

  private getAllDeviceTypes(): void {
    this.deviceTypeService.getAllDeviceTypes().subscribe({
      next: resp => {
        this.allDeviceTypes = resp;
      },
      error: error => {
        console.log(error);
      }
    })
  }

  addDevice(device: Devices) {
    this.deviceService.addDevice(device).subscribe(
      {
        next: () => {
          this.toastr.success("Device successfully added!");
          this.deviceService.addDevice(device);
          this.router.navigate(['/devices']);
        },
        error: (e) => {
          this.toastr.error(e.error.Message);
        }
      }
    );
  }
}