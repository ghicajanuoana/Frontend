import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';
import { Devices } from 'src/app/models/device.model';
import { LocationService } from 'src/app/services/location.service';
import { Location } from 'src/app/models/location.model';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { DeviceTypes } from 'src/app/models/device-type.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-device',
  templateUrl: './add-edit-device.component.html',
  styleUrls: ['./add-edit-device.component.css']
})
export class AddEditDeviceComponent implements OnInit {

  allLocations: Location[] = [];
  allDeviceTypes: DeviceTypes[] = [];
  isEditMode: boolean;
  deviceId: any;
  device: Devices = new Devices();
  addEditDeviceForm: FormGroup;

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private router: Router, private deviceService: DeviceService,
    private locationService: LocationService, private deviceTypeService: DeviceTypeService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.deviceId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = this.route.snapshot.data['isEditMode'];
    if (this.isEditMode) {
      this.getDeviceById();
    }

    this.getAllLocations();
    this.getAllDeviceTypes();
    this.addEditDeviceForm = this.formBuilder.group({
      name: ["", Validators.required],
      emails: ["", Validators.email],
      location: ["", [Validators.required, Validators.min(1)]],
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
        this.toastr.error(error.message);
      }
    })
  }

  private getAllDeviceTypes(): void {
    this.deviceTypeService.getAllDeviceTypes().subscribe({
      next: resp => {
        this.allDeviceTypes = resp;
      },
      error: error => {
        this.toastr.error(error.message);
      }
    })
  }

  get addEditDeviceControls(): any {
    return this.addEditDeviceForm.controls;
  }

  addOrEditDevice() {
    if (this.addEditDeviceForm.valid) {
      this.device = {
        deviceId: !this.isEditMode ? 0 : this.deviceId,
        name: this.addEditDeviceControls.name.value,
        emails: this.addEditDeviceControls.emails.value,
        location: this.addEditDeviceControls.location.value,
        deviceType: this.addEditDeviceControls.deviceType.value,
        serialNumber: this.addEditDeviceControls.serialNumber.value,
        softwareVersion: this.addEditDeviceControls.softwareVersion.value,
        firmwareVersion: this.addEditDeviceControls.firmwareVersion.value,
        alias: this.addEditDeviceControls.alias.value,
        imagePath: this.addEditDeviceControls.imagePath.value,
        description: this.addEditDeviceControls.description.value
      }

      if (this.isEditMode) {
        this.deviceService.updateDevice(this.device).subscribe(
          {
            next: () => {
              this.toastr.success("Device successfully updated!");
              this.router.navigate(['/devices']);
            },
            error: (e) => {
              if (e.status === 702 || e.status === 700) {
                this.toastr.error(e.error);
              }
            }
          }
        )
      }
      else {
        this.deviceService.addDevice(this.device).subscribe(
          {
            next: () => {
              this.toastr.success("Device successfully added!");
              this.router.navigate(['/devices']);
            },
            error: (e) => {
              if (e.status === 700) {
                this.toastr.error(e.error);
              }
            }
          }
        );
      }
    }
  }

  getDeviceById() {
    this.deviceService.getDevice(this.deviceId).subscribe({
      next: resp => {
        this.device = resp;
      },
      error: (e) => {
        if (e.status === 702) {
          this.toastr.error(e.error);
        }
      }
    });
  }

  compareObjects(o1: any, o2: any) {
    return (o1.name == o2.name && o1.id == o2.id) ? true : false;
  }
}