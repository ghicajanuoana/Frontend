import { Component, OnInit } from '@angular/core';
import { Maintenance } from 'src/app/models/maintenance.model';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { DatePipe } from "@angular/common";
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  pageIndex = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20]
  length = 0;
  dateNow = Date.now();

  maintenances: Maintenance[] = [];
  pipe = new DatePipe('en-US');
  columnsToDisplay: string[] = ["device", "description", "outcome", "status", "scheduledDate", "actualDate", "createdAt", "createdBy", "actions"];

  constructor(public maintenanceService: MaintenanceService) { }

  ngOnInit(): void {
    this.getMaintenances();
  }

  getMaintenances() {
    this.maintenanceService.getMaintenancesPaged(this.pageIndex, this.pageSize)
      .subscribe((response) => {
        this.maintenances = response.data;
        this.length = response.totalCount;
      });
  }

  pageChangeEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getMaintenances();
  }

  handleDate(scheduledDate: any, today: any) {
    scheduledDate = this.pipe.transform(scheduledDate, 'dd MMM y');
    today = this.pipe.transform(today, 'dd MMM y');

    scheduledDate = new Date(scheduledDate);
    today = new Date(today);

    return (scheduledDate.getTime() - today.getTime()) / 1000 / 3600 / 24;
  }
}
