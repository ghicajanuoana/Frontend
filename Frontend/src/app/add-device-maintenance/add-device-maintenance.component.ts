import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Devices } from '../models/device.model';
import { Maintenance } from '../models/maintenance.model';
import { DeviceService } from '../services/device.service';
import { MaintenanceService } from '../services/maintenance.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-add-device-maintenance',
  templateUrl: './add-device-maintenance.component.html',
  styleUrls: ['./add-device-maintenance.component.css']
})
export class AddDeviceMaintenanceComponent implements OnInit {

  allDevices: Devices[] = [];
  addMaintenanceForm!: FormGroup;
  // device: Devices = new Devices();
  //device: any;
  maintenance: Maintenance = new Maintenance();
  maintenanceId: any;
  isEditMode: boolean;

  constructor(private formBuilder: FormBuilder,
    private navigation: NavigationService,
    private router: Router,
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private maintenanceService: MaintenanceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.isEditMode = this.route.snapshot.data['isEditMode'];
    // console.log(this.isEditMode);
    this.maintenanceId = this.route.snapshot.paramMap.get('id');
    // this.device = this.route.snapshot.paramMap.get('id');
    if (this.isEditMode) {
      this.getMaintenanceById();
    }
    this.getAllDevices();
    this.addMaintenanceForm = this.formBuilder.group({
      device: ["", Validators.required],
      scheduledDate: ["", Validators.required],
      description: [""]
    })
  }

  get maintenanceControl(): any {
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

  back(): void {
    this.navigation.back()
  }

  addMaintenance() {
    console.log("din add", this.isEditMode);
    if(this.addMaintenanceForm.valid){ //let maintenance: Maintenance= {}
      console.log("test", this.maintenance);
    this.maintenance = {
      //this line of code was before
      // id: 0,
      id: !this.isEditMode ? 0 :  this.maintenanceId,
      device: this.maintenanceControl.device.value,   
      scheduledDate: this.maintenanceControl.scheduledDate.value,
      description: this.maintenanceControl.description.value
      // status: "",
      // createdAt: [],
      // createdBy: ""
    }

    if(this.isEditMode){
      this.maintenanceService.updateMaintenance(this.maintenance).subscribe(
        {
          next: () => {
            this.toastr.success("Maintenance successfully updated!");
            this.back();
          },
          error: (e) => {
            this.toastr.error(e.error);
          }
        });
    }
    else {
      // console.log(this.maintenance);
       this.maintenanceService.addMaintenance(this.maintenance).subscribe(
      {
        next: () => {
          this.toastr.success("Device maintenance successfully added!");
          this.router.navigate(['/maintenance']);
        },
        error: (e) => {
          this.toastr.error(e.error);
        }
      });
    }
   } 
  }

  getMaintenanceById() {
    this.maintenanceService.getMaintenance(this.maintenanceId).subscribe({
      next: resp => {
        this.maintenance = resp;
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
