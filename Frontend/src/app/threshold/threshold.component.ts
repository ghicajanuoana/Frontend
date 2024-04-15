import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Threshold } from '../models/threshold.model';
import { ThresholdsService } from '../services/threshold.service';
import { ConfirmationDialogComponent } from '../devices/device-type/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-threshold',
  templateUrl: './threshold.component.html',
  styleUrls: ['./threshold.component.css']
})
export class ThresholdComponent implements OnInit, AfterViewInit {

  columnsToDisplay: string[] = ["deviceType", "readingType", "minValue", "warningValue", "criticalValue", "maxValue", "actions"];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  columnsToDisplayFilter: string[] = ["deviceType-filter", "deviceReadingType-filter", "minValue-filter", "warningValue-filter", "criticalValue-filter", "maxValue-filter", "empty-cell"];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<Threshold>();

  @ViewChild(MatSort) sort: MatSort;
  deviceTypeFilter = new FormControl();
  deviceReadingTypeFilter = new FormControl();
  minValueFilter = new FormControl();
  warningValueFilter = new FormControl();
  criticalValueFilter = new FormControl();
  maxValueFilter = new FormControl();

  filteredValues = {
    deviceType: '',
    deviceReadingType: '',
    minValue: '',
    warningValue: '',
    criticalValue: '',
    maxValue: ''
  };

  constructor(public router: Router, public thresholdService: ThresholdsService, public dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getThresholds();

    this.deviceTypeFilter.valueChanges.subscribe((deviceTypeFilterValue) => {
      this.filteredValues.deviceType = deviceTypeFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.deviceReadingTypeFilter.valueChanges.subscribe((deviceReadingTypeFilterValue) => {
      this.filteredValues.deviceReadingType = deviceReadingTypeFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.minValueFilter.valueChanges.subscribe((minValueFilterValue) => {
      this.filteredValues.minValue = minValueFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.warningValueFilter.valueChanges.subscribe((warningValueFilterValue) => {
      this.filteredValues.warningValue = warningValueFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.criticalValueFilter.valueChanges.subscribe((criticalValueFilterValue) => {
      this.filteredValues.criticalValue = criticalValueFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.maxValueFilter.valueChanges.subscribe((maxValueFilterValue) => {
      this.filteredValues.maxValue = maxValueFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  ngAfterViewInit(): void {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'deviceType': return item.deviceType.name.toLowerCase();
        case 'readingType': return item.deviceReadingType.name.toLowerCase();
        default: return item[property];
      }
    };
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getThresholds() {
    this.thresholdService.getAllThresholds().subscribe({
      next: resp => {
        this.dataSource.data = resp;
      },
      error: error => {
        this.toastr.error(error.message);
      }
    });
  }

  openConfirmationDialog(threshold: any): void {
    this.checkResponse(threshold.id);
  }

  checkResponse(thresholdId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.message = "Are you sure you want to delete this threshold?";
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteThreshold(thresholdId)
      }
    });
  }

  deleteThreshold(thresholdId: number) {
    this.thresholdService.deleteThreshold(thresholdId).subscribe({
      next: resp => {
        this.getThresholds();
        this.toastr.info(resp);
      },
      error: error => {
        this.toastr.error(error.message);
      }
    });
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: Threshold, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      return (
        data.deviceType?.name
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.deviceType.toLowerCase()) !== -1 &&
        data.deviceReadingType?.name
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.deviceReadingType.toLowerCase()) !== -1 &&
        data.minValue
          .toString()
          .trim()
          .indexOf(searchString.minValue) !== -1 &&
        data.warningValue
          .toString()
          .trim()
          .indexOf(searchString.warningValue) !== -1 &&
        data.criticalValue
          .toString()
          .trim()
          .indexOf(searchString.criticalValue) !== -1 &&
        data.maxValue
          .toString()
          .trim()
          .indexOf(searchString.maxValue) !== -1
      );
    };

    return myFilterPredicate;
  }
}