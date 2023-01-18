import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DeviceTypes } from 'src/app/models/device-type.model';
import { Router } from '@angular/router';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeviceTypeComponent } from './dialog-device-type/dialog-device-type.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-device-type',
  templateUrl: './device-type.component.html',
  styleUrls: ['./device-type.component.css']
})
export class DeviceTypeComponent implements OnInit, AfterViewInit {

  deviceTypes: DeviceTypes[] = []
  columnsToDisplay: string[] = ["name", "actions"];
  columnsToDisplayFilter: string[] = ["name-filter", "action-filter"];
  rowSelected: any;
  name!: string;
  deviceFound: boolean = false;
  currentDeviceType: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public router: Router, public deviceTypeService: DeviceTypeService, public dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDeviceTypes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(DialogDeviceTypeComponent,
      {
        data: { deviceType: { name: this.name }, isEditMode: false, dialogTitle: "Add Device Type" }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDeviceTypes();
      }
    });
  }

  getDeviceTypes() {
    this.deviceTypeService.getAllDeviceTypes().subscribe({
      next: resp => {
        this.dataSource.data = resp;
      },
      error: error => {
        this.toastr.error(error.message);
      }
    })
  }

  openConfDialog(device: any): void {
    this.checkDeviceTypeIsUsed(device.deviceTypeId, device);
  }

  selectedRow(row: any) {
    this.rowSelected = row;
  }

  checkDeviceTypeIsUsed(id: number, device: any): void {
    this.deviceTypeService.checkDeleteDeviceTypeIsUsed(id).subscribe({
      next: () => {
        this.deviceFound = false;
        const dialogRef = this.dialog.open(ConfirmationDialogComponent);
        dialogRef.componentInstance.message = "Are you sure you want to delete this device type?";
        this.currentDeviceType = device;
        dialogRef.afterClosed().subscribe(result => {
          if (result == true)
            this.deleteDeviceType();
        });
      },
      error: () => {
        const dialogRef = this.dialog.open(DeleteConfirmationComponent);
        dialogRef.componentInstance.message = "This device type is in use, please remove it from all devices!";
        dialogRef.componentInstance.title = "Device type in use!"
      }
    });
  }

  deleteDeviceType(): void {
    this.deviceTypeService.deleteDeviceType(this.currentDeviceType.deviceTypeId).subscribe({
      next: resp => {
        this.getDeviceTypes();
        this.toastr.info(resp);
      },
      error: error => {
        this.toastr.error(error.error.Message);
      }
    });
  }

  openUpdateDialog(deviceType: any): void {
    const dialogRef = this.dialog.open(DialogDeviceTypeComponent,
      {
        data: { deviceType: deviceType, isEditMode: true, dialogTitle: "Update Device Type" }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDeviceTypes();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}