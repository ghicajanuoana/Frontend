import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditDeviceComponent } from './devices/add-edit-device/add-edit-device.component';
import { AddAndEditLocationComponent } from './location/add-edit-location/add-edit-location.component';
import { DeviceTypeComponent } from './devices/device-type/device-type.component';
import { DeviceComponent } from './devices/device/device.component';
import { LocationComponent } from './location/location.component';
import { ThresholdComponent } from './threshold/threshold.component';
import { DeviceReadingTypesComponent } from './device-reading-types/device-reading-types.component';
import { AddThresholdComponent } from './add-threshold/add-threshold.component';
import { UserComponent } from './user/user.component';
import { MaintenanceComponent } from './devices/maintenance/maintenance.component';
import { AddDeviceMaintenanceComponent } from './add-device-maintenance/add-device-maintenance.component';
import { AddEditUserComponent } from './users/add-edit-user/add-edit-user.component';

const routes: Routes = [
  {
    path: "",
    component: LocationComponent,
    pathMatch: 'full'
  },
  {
    path: "locations",
    component: LocationComponent
  },
  {
    path: "users",
    component: UserComponent
  },
  {
    path: "devices",
    component: DeviceComponent
  },
  {
    path: "device-types",
    component: DeviceTypeComponent
  },
  {
    path: "location",
    component: AddAndEditLocationComponent,
    data: {
      isEditMode: false
    }
  },
  {
    path: "location/:id",
    component: AddAndEditLocationComponent,
    data: {
      isEditMode: true
    }
  },
  {
    path: "thresholds",
    component: ThresholdComponent
  },
  {
    path: "device/:id",
    component: AddEditDeviceComponent,
    data: {
      isEditMode: true
    }
  },
  {
    path: "user/:id",
    component: AddEditUserComponent,
    data: {
      isEditMode: true
    }
  },
  {
    path: "device",
    component: AddEditDeviceComponent,
    data: {
      isEditMode: false
    }
  },
  {
    path: "device-reading-types",
    component: DeviceReadingTypesComponent
  },
  {
    path: "add-threshold",
    component: AddThresholdComponent,
    data: {
      isEditMode: false
    }
  },
  {
    path: "add-threshold/:id",
    component: AddThresholdComponent,
    data: {
      isEditMode: true
    }
  },
  {
    path: "add-device-maintenances",
    component: AddDeviceMaintenanceComponent
  },
  {
    path: "maintenance",
    component: MaintenanceComponent
  },
  {
    path: "user",
    component: AddEditUserComponent,
    data: {
      isEditMode: false
    }
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
