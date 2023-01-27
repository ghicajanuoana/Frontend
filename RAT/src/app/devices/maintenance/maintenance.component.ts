import { Component, OnInit } from '@angular/core';
import { Maintenance } from 'src/app/models/maintenance.model';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { DatePipe } from "@angular/common";
import { PageEvent } from '@angular/material/paginator';
import { MaintenanceParameters } from 'src/app/models/maintenance-parameters.model';
import { FormControl, FormGroup } from '@angular/forms';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  rangeScheduledDate: FormGroup = new FormGroup({
    start: new FormControl(''),
    end: new FormControl(''),
  });
  rangeActualDate: FormGroup = new FormGroup({
    start: new FormControl(''),
    end: new FormControl(''),
  });
  rangeCreatedAt: FormGroup = new FormGroup({
    start: new FormControl(''),
    end: new FormControl(''),
  });
  maintenanceParameters: MaintenanceParameters = new MaintenanceParameters();
  pageIndex = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20]
  length = 0;
  selected = 1;
  dateNow = Date.now();
  statusOptions = [
    {value: 0, viewValue: "New"},
    {value: 1, viewValue: "Pending"},
    {value: 2, viewValue: "Completed"}
  ];

  maintenances: Maintenance[] = [];
  pipe = new DatePipe('en-US');
  columnsToDisplay: string[] = ["device", "description", "outcome", "status", "scheduledDate", "actualDate", "createdAt", "createdBy", "actions"];

  constructor(public maintenanceService: MaintenanceService) { }

  ngOnInit(): void {
    this.maintenanceParameters.orderBy = "status";
    this.maintenanceParameters.pageNumber = this.pageIndex;
    this.maintenanceParameters.pageSize = this.pageSize;
    this.getMaintenances();
  }

  getMaintenances() {
    this.maintenanceService.getMaintenancesPaged(this.maintenanceParameters)
      .subscribe((response) => {
        this.maintenances = response.data;
        this.length = response.totalCount;
      });
  }

  pageChangeEvent(event: PageEvent) {
    this.maintenanceParameters.pageNumber = event.pageIndex;
    this.maintenanceParameters.pageSize = event.pageSize;
    this.getMaintenances();
  }

  handleDate(scheduledDate: any, today: any) {
    scheduledDate = this.pipe.transform(scheduledDate, 'dd MMM y');
    today = this.pipe.transform(today, 'dd MMM y');

    scheduledDate = new Date(scheduledDate);
    today = new Date(today);

    return (scheduledDate.getTime() - today.getTime()) / 1000 / 3600 / 24;
  }

  sortData(headerName: string) {
    if (headerName) {
      this.maintenanceParameters.orderDescending = this.maintenanceParameters.orderDescending === false ? true : false;
      this.maintenanceParameters.orderBy = headerName;
      this.getMaintenances();
    }
  }

  scheduledDateSelected(){
    this.maintenanceParameters.scheduledDateStart = String(this.pipe.transform(this.rangeScheduledDate.value.start, 'y-MM-ddThh:mm:ss.SSS'));
    this.maintenanceParameters.scheduledDateEnd = String(this.pipe.transform(this.rangeScheduledDate.value.end, 'y-MM-ddThh:mm:ss.SSS'));
    this.filterMaintenances();
  }

  actualDateSelected(){
    this.maintenanceParameters.actualDateStart = String(this.pipe.transform(this.rangeActualDate.value.start, 'y-MM-ddThh:mm:ss.SSS'));
    this.maintenanceParameters.actualDateEnd = String(this.pipe.transform(this.rangeActualDate.value.end, 'y-MM-ddThh:mm:ss.SSS'));
    this.filterMaintenances();
  }

  createdAtSelected(){
    this.maintenanceParameters.createdAtStart = String(this.pipe.transform(this.rangeCreatedAt.value.start, 'y-MM-ddThh:mm:ss.SSS'));
    this.maintenanceParameters.createdAtEnd = String(this.pipe.transform(this.rangeCreatedAt.value.end, 'y-MM-ddThh:mm:ss.SSS'));
    this.filterMaintenances();
  }

  filterMaintenances() {
    this.maintenanceParameters.pageNumber = 0;
    this.pageIndex = 0;
    this.getMaintenances();
  }

  isSorting(name: string) {
    return this.maintenanceParameters.orderBy === name;
  };
}
