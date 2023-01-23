import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/models/location.model';
import { LocationService } from 'src/app/services/location.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private formBuilder: FormBuilder,
    private locationService: LocationService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.locationId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = this.route.snapshot.data['isEditMode'];

    if (this.isEditMode) {
      this.getLocationById();
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

  get addLocation(): any {
    return this.addEditLocationForm.controls;
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
}
