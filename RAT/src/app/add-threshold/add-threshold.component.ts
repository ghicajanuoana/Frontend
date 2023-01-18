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

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private deviceReadingTypesService: DeviceReadingTypesService,
    private deviceTypeService: DeviceTypeService,
    private thresholdService: ThresholdsService,
    private toastr: ToastrService) { }


  ngOnInit(): void {
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

  addThreshold() {
    let threshold: Threshold = {
      deviceTypeId: this.thresholdForm.deviceType.value,
      deviceReadingTypeId: this.thresholdForm.deviceReadingType.value,
      minValue: this.thresholdForm.minValue.value,
      warningValue: this.thresholdForm.warningValue.value,
      criticalValue: this.thresholdForm.criticalValue.value,
      maxValue: this.thresholdForm.maxValue.value
    }

    this.thresholdService.addThreshold(threshold).subscribe(
      {
        next: () => {
          this.router.navigate(['/thresholds']);
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