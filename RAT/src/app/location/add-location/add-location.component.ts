import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from 'src/app/models/location.model';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {

  checked: boolean = true;
  addLocationForm!: FormGroup;
  errors: any;
  lat?: number | undefined;
  lng?: number | undefined;
  errorMessage: string = "";
  readonly uniqueNameError: string = 'Invalid Location. Enter an unique name!';

  constructor(private formBuilder: FormBuilder, private locationService: LocationService, private router: Router) { }

  ngOnInit(): void {
    this.addLocationForm = this.formBuilder.group({
      contactEmail: ["", Validators.email],
      recipientEmail: ["", Validators.email],
      name: ["", Validators.required],
      country: ["", Validators.required],
      city: ["", Validators.required],
      address: ["", Validators.required],
      emailAlerts: [true, Validators.required],
      latitude: [{ value: this.lat, disabled: true }],
      longitude: [{ value: this.lng, disabled: true }]
    })
  }

  get addLocation(): any {
    return this.addLocationForm.controls;
  }

  createLocation() {
    if (this.addLocationForm.valid) {
      let location: Location = {
        country: this.addLocation.country.value,
        city: this.addLocation.city.value,
        emailAlertsActive: this.addLocation.emailAlerts.value,
        name: this.addLocation.name.value,
        address: this.addLocation.address.value,
        recipientEmail: this.addLocation.recipientEmail.value,
        contactEmail: this.addLocation.contactEmail.value,
        latitude: this.lat,
        longitude: this.lng
      }
      this.locationService.addLocation(location).subscribe({
        next: () => {
          this.locationService.addLocation(location);
          this.router.navigate(['/locations']);
        },
        error: (e) => {
          console.log(e);
          this.errorMessage = e.error;
        }
      })
    }
  }

  latitudeHandler($event: any) {
    this.lat = $event;
  }

  longitudeHandler($event: any) {
    this.lng = $event;
  }
}