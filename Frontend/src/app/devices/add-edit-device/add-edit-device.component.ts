import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';
import { Devices } from 'src/app/models/device.model';
import { LocationService } from 'src/app/services/location.service';
import { Location } from 'src/app/models/location.model';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { DeviceTypes } from 'src/app/models/device-type.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-add-edit-device',
  templateUrl: './add-edit-device.component.html',
  styleUrls: ['./add-edit-device.component.css']
})
export class AddEditDeviceComponent implements OnInit {

  @ViewChild("input", { static: false }) inputRef: ElementRef;
  allLocations: Location[] = [];
  allDeviceTypes: DeviceTypes[] = [];
  isEditMode: boolean;
  deviceId: any;
  device: Devices = new Devices();
  addEditDeviceForm: FormGroup;
  targetFile: File;
  isTargetFile: boolean = false;
  isExistentImageRemoved: boolean = false;
  displayImage: any;
  imageURL: any;

    constructor(private toastr: ToastrService, private navigation: NavigationService, private formBuilder: FormBuilder, private router: Router, private deviceService: DeviceService,
    private locationService: LocationService, private deviceTypeService: DeviceTypeService, private route: ActivatedRoute, public dialog: MatDialog) {
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
      description: [""]
    })
  }
  
  back(): void {
    this.navigation.back()
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

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    if (element.files) {
      this.targetFile = element.files[0];
      this.isTargetFile = true;
      var reader = new FileReader();
      reader.readAsDataURL(this.targetFile);
      reader.onload = () => {
        this.imageURL = reader.result;
      }
    }
  }

  onFileReset() {
    this.inputRef.nativeElement.value = "";
    this.imageURL = null;
    if (this.isEditMode) {
      this.device.imageBytes = '';
      this.isExistentImageRemoved = true;
    }
    this.isTargetFile = false;
  }

  openImageDialog() {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      data: {
        image: this.device.imageBytes
      }
    });
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
        description: this.addEditDeviceControls.description.value,
        imageFile: this.targetFile,
        imageBytes: this.device.imageBytes
      }

      if (this.isEditMode) {
        this.deviceService.updateDevice(this.device).subscribe(
          {
            next: () => {
              this.toastr.success("Device successfully updated!");
              // this.back();
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
              // this.back();
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

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}