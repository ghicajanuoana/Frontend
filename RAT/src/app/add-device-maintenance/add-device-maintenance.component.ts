import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Devices } from '../models/device.model';
import { Maintenance } from '../models/maintenance.model';
import { DeviceService } from '../services/device.service';
import { MaintenanceService } from '../services/maintenance.service';

@Component({
  selector: 'app-add-device-maintenance',
  templateUrl: './add-device-maintenance.component.html',
  styleUrls: ['./add-device-maintenance.component.css']
})
export class AddDeviceMaintenanceComponent implements OnInit {

  allDevices: Devices[] = [];
  addMaintenanceForm!: FormGroup;
  device: Devices = new Devices();

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private deviceService: DeviceService,
    private maintenanceService: MaintenanceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllDevices();
    this.addMaintenanceForm = this.formBuilder.group({
      device: ["", Validators.required],
      scheduledDate: ["", Validators.required],
      description: [""]
    })
  }

  get maintenanceForm(): any {
    return this.addMaintenanceForm.controls;
  }

  private getAllDevices(): void {
    this.deviceService.getAllDevices().subscribe({
      next: resp => {
        this.allDevices = resp;
      },
      error: error => {
        this.toastr.error(error.message);
      }
    })
  }

  addMaintenance() {
    let maintenance: Maintenance = {
      deviceId: this.maintenanceForm.device.value,
      scheduledDate: this.maintenanceForm.scheduledDate.value,
      description: this.maintenanceForm.description.value,
      status: "",
      createdAt: [],
      createdBy: ""
    }

    this.maintenanceService.addMaintenance(maintenance).subscribe(
      {
        next: () => {
          this.toastr.success("Device maintenance successfully added!");
          this.router.navigate(['/maintenance']);
        },
        error: (e) => {
          if (e.status === 701) {
            this.toastr.error(e.error);
          }
        }
      }
    );
  }
}
