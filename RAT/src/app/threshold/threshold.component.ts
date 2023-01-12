import { Component, OnInit } from '@angular/core';
import { Threshold } from '../models/threshold.model';
import { ThresholdsService } from '../services/threshold.service';

@Component({
  selector: 'app-threshold',
  templateUrl: './threshold.component.html',
  styleUrls: ['./threshold.component.css']
})
export class ThresholdComponent implements OnInit {

  thresholds: Threshold[] = []
  columnsToDisplay: string[] = ["deviceType", "readingType", "minValue", "warningValue", "criticalValue", "maxValue", "actions"];

  constructor(public thresholdService: ThresholdsService) { }

  ngOnInit(): void {
    this.getThresholds();
  }

  getThresholds() {
    this.thresholdService.getAllThresholds().subscribe({
      next: resp => {
        this.thresholds = resp;
      },
      error: error => {
        console.log(error)
      }
    })
  }
}