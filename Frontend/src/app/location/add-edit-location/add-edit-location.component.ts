import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/models/location.model';
import { LocationService } from 'src/app/services/location.service';
import { ToastrService } from 'ngx-toastr';
import { DeviceService } from 'src/app/services/device.service';
import { Devices } from 'src/app/models/device.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/devices/device-type/confirmation-dialog/confirmation-dialog.component';
import { UserAdd } from 'src/app/models/useradd.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-edit-location',
  templateUrl: './add-edit-location.component.html',
  styleUrls: ['./add-edit-location.component.css']
})
export class AddAndEditLocationComponent implements OnInit {
  locationId: any;
  location: Location = new Location();
  isEditMode: boolean;
  checked: boolean = true;
  addEditLocationForm!: FormGroup;
  errors: any;
  initLat?: number | undefined;
  initLng?: number | undefined;
  errorMessage: string = "";
  allDevices: Devices[] = [];
  currentDevice: any;
  columnsToDisplay: string[] = ["name", "serialNumber", "description", "imagePath", "deviceType", "location", "actions"];

  allEmailRecipients: UserAdd[] = [];

  constructor(private formBuilder: FormBuilder,
    private locationService: LocationService,
    private deviceService: DeviceService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.locationId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = this.route.snapshot.data['isEditMode'];

    this.getAllEmailRecipients();

    if (this.isEditMode) {
      this.getLocationById();
      this.getAllDevicesByLocationId();
    }
    
    this.addEditLocationForm = this.formBuilder.group({
      contactEmail: ["", Validators.email],
      emailRecipient: ["", Validators.email],
      name: ["", Validators.required],
      country: ["", Validators.required],
      city: ["", Validators.required],
      address: ["", Validators.required],
      emailAlerts: [true, Validators.required],
      latitude: [{ value: this.initLat, disabled: true }],
      longitude: [{ value: this.initLng, disabled: true }]
    });
  }

  private getAllEmailRecipients(): void {
    this.userService.getAllUsers().subscribe({
      next: resp => {
        this.allEmailRecipients = resp;
      },
      error: error => {
        this.toastr.error(error.message);
      }
    })
  }

  get addLocation(): any {
    return this.addEditLocationForm.controls;
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  addOrEditLocation() {
    if (this.addEditLocationForm.valid) {
      let location: Location = {
        locationId: !this.isEditMode ? 0 : this.locationId,
        country: this.addLocation.country.value,
        city: this.addLocation.city.value,
        emailAlertsActive: this.addLocation.emailAlerts.value,
        name: this.addLocation.name.value,
        address: this.addLocation.address.value,
        emailRecipient: this.addLocation.emailRecipient.value,
        contactEmail: this.addLocation.contactEmail.value,
        latitude: this.initLat,
        longitude: this.initLng
      }

      if (!this.isEditMode) {
        this.locationService.addLocation(location).subscribe({
          next: () => {
            this.toastr.success("Location successfully added!");
            this.router.navigate(['/locations']);
          },
          error: (e) => {
            if (e.status === 700) {
              this.toastr.error(e.error);
            }
          }
        });
      } else {
        this.locationService.updateLocation(location).subscribe({
          next: () => {
            this.toastr.success("Location successfully updated!");
            this.router.navigate(['/locations']);
          },
          error: (e) => {
            if (e.status === 702 || e.status === 700) {
              this.toastr.error(e.error);
            }
          }
        });
      }
    }
  }

  latitudeHandler($event: any) {
    this.initLat = $event;
  }

  longitudeHandler($event: any) {
    this.initLng = $event;
  }
  
  getAllDevicesByLocationId(): void {
    this.deviceService.getAllDevicesByLocationId(this.locationId).subscribe({
      next: resp => {
        this.allDevices = resp;
      },
      error: error => {
        this.toastr.error(error.message);
      }
    })
  }

  getLocationById() {
    this.locationService.getLocation(this.locationId).subscribe({
      next: resp => {
        this.location = {
          address: resp.address,
          city: resp.city,
          contactEmail: resp.contactEmail,
          country: resp.country,
          emailAlertsActive: resp.emailAlertsActive,
          emailRecipient: resp.emailRecipient,
          name: resp.name,
          latitude: resp.latitude,
          longitude: resp.longitude
        }
        this.initLat = resp.latitude;
        this.initLng = resp.longitude;
      },
      error: (e) => {
        if (e.status === 702) {
          this.toastr.error(e.error);
        }
      }
    });
  }

  onDelete(device: any): void {
    this.deleteDevice(device.deviceId, device);
  }

  deleteDevice(id: number, device: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.message = "Are you sure you want to delete this device ?";
    this.currentDevice = device;
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.deleteDeviceConfirmed();
    });
  }

  deleteDeviceConfirmed(): void {
    this.deviceService.deleteDevice(this.currentDevice.deviceId).subscribe({
      next: resp => {
        this.getAllDevicesByLocationId();
        this.toastr.info(resp);
      },
      error: error => {
        this.toastr.error(error.error.Message);
      }
    });
  }

  compareObjects(o1: any, o2: any) {
    return (o1.name == o2.name && o1.id == o2.id) ? true : false;
  }
}
