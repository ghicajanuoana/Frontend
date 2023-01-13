import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Threshold } from '../models/threshold.model';
import { ThresholdsService } from '../services/threshold.service';
import { ConfirmationDialogComponent } from '../devices/device-type/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-threshold',
  templateUrl: './threshold.component.html',
  styleUrls: ['./threshold.component.css']
})
export class ThresholdComponent implements OnInit {

  columnsToDisplay: string[] = ["deviceType", "readingType", "minValue", "warningValue", "criticalValue", "maxValue", "actions"];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  thresholds: MatTableDataSource<any> = new MatTableDataSource<Threshold>();

  constructor(public thresholdService: ThresholdsService, public dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.thresholds.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getThresholds();
  }

  getThresholds() {
    this.thresholdService.getAllThresholds().subscribe({
      next: resp => {
        this.thresholds.data = resp;
      },
      error: error => {
        console.log(error)
      }
    })
  }

  openConfirmationDialog(threshold: any): void {
    this.checkResponse(threshold.id);
  }

  checkResponse(thresholdId: number){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.message = "Are you sure you want to delete this threshold?";
    dialogRef.afterClosed().subscribe(result => {
      if (result == true){
        this.deleteThreshold(thresholdId)
      }
    });
  }

  deleteThreshold(thresholdId: number){
    this.thresholdService.deleteThreshold(thresholdId).subscribe({
      next: resp => {
        this.getThresholds();
      },
      error: error => {
        console.log(error);
      }
    });
  }
}