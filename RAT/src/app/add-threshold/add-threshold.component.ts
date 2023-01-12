import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { DeviceTypes } from 'src/app/models/device-type.model';
import { Threshold } from '../models/threshold.model';
import { DeviceReadingType } from '../models/device-reading-types';
import { DeviceReadingTypesService } from '../services/device-reading-types.service';
import { ThresholdsService } from '../services/threshold.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-threshold',
  templateUrl: './add-threshold.component.html',
  styleUrls: ['./add-threshold.component.css']
})
export class AddThresholdComponent implements OnInit {

  allDeviceTypes: DeviceTypes[] = [];
  allDeviceReadingTypes: DeviceReadingType[] = [];
  addThresholdForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private deviceReadingTypesService: DeviceReadingTypesService,
    private deviceTypeService: DeviceTypeService,
    private thresholdService: ThresholdsService) { }

  ngOnInit(): void {
    this.getAllDeviceTypes();
    this.getAllDeviceReadingTypes();
    this.addThresholdForm = this.formBuilder.group({
      deviceType: ["", Validators.required],
      deviceReadingType: ["", Validators.required],
      minValue: ["", Validators.required],
      warningValue: ["", Validators.required],
      criticalValue: ["", Validators.required],
      maxValue: ["", Validators.required],
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

  private getAllDeviceReadingTypes(): void {
    this.deviceReadingTypesService.getAllDeviceReadingTypes().subscribe({
      next: resp => {
        this.allDeviceReadingTypes = resp;
      },
      error: error => {
        console.log(error);
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
          console.log(e);
        }
      }
    );
  }
}