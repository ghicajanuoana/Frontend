import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { DeviceTypes } from 'src/app/models/device-type.model';
import { Threshold } from '../models/threshold.model';
import { DeviceReadingType } from '../models/device-reading-types';
import { DeviceReadingTypesService } from '../services/device-reading-types.service';
import { ThresholdsService } from '../services/threshold.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-threshold',
  templateUrl: './add-threshold.component.html',
  styleUrls: ['./add-threshold.component.css']
})
export class AddThresholdComponent implements OnInit {

  allDeviceTypes: DeviceTypes[] = [];
  allDeviceReadingTypes: DeviceReadingType[] = [];
  addThresholdForm!: FormGroup;
  numRegex = /^-?\d*[.,]?\d{0,2}$/;
  isEditMode: boolean;
  threshold: Threshold = new Threshold();
  thresholdId: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private deviceReadingTypesService: DeviceReadingTypesService,
    private deviceTypeService: DeviceTypeService,
    private thresholdService: ThresholdsService,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.thresholdId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = this.route.snapshot.data['isEditMode'];

    if (this.isEditMode) {
      this.getThresholdById();
    }

    this.getAllDeviceTypes();
    this.getAllDeviceReadingTypes();

    this.addThresholdForm = this.formBuilder.group({
      deviceType: ["", Validators.required],
      deviceReadingType: ["", Validators.required],
      minValue: ["", [Validators.required, Validators.pattern(this.numRegex)]],
      warningValue: ["", [Validators.required, Validators.pattern(this.numRegex)]],
      criticalValue: ["", [Validators.required, Validators.pattern(this.numRegex)]],
      maxValue: ["", [Validators.required, Validators.pattern(this.numRegex)]],
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

  private getAllDeviceReadingTypes(): void {
    this.deviceReadingTypesService.getAllDeviceReadingTypes().subscribe({
      next: resp => {
        this.allDeviceReadingTypes = resp;
      },
      error: error => {
        this.toastr.error(error.message);
      }
    })
  }

  get thresholdForm(): any {
    return this.addThresholdForm.controls;
  }

  addOrEditThreshold() {
    if (this.addThresholdForm.valid) {
      this.threshold = {
        id: !this.isEditMode ? 0 : this.thresholdId,
        deviceType: this.thresholdForm.deviceType.value,
        deviceReadingType: this.thresholdForm.deviceReadingType.value,
        minValue: this.thresholdForm.minValue.value,
        warningValue: this.thresholdForm.warningValue.value,
        criticalValue: this.thresholdForm.criticalValue.value,
        maxValue: this.thresholdForm.maxValue.value
      }
      if (this.isEditMode) {
        this.thresholdService.updateThreshold(this.threshold).subscribe(
          {
            next: () => {
              this.router.navigate(['/thresholds']);
            },
            error: (e) => {
              this.toastr.error(e.error);
            }
          });
      }
      else {
        this.thresholdService.addThreshold(this.threshold).subscribe(
          {
            next: () => {
              this.router.navigate(['/thresholds']);
            },
            error: (e) => {
              this.toastr.error(e.error);
            }
          });
      }
    }
  }

  getThresholdById() {
    this.thresholdService.getThreshold(this.thresholdId).subscribe({
      next: resp => {
        this.threshold = resp;
      },
      error: (e) => {
        this.toastr.error(e.error);
      }
    });
  }

  compareObjects(o1: any, o2: any) {
    return (o1.name == o2.name && o1.id == o2.id) ? true : false;
  }
}