import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDeviceComponent } from './devices/add-device/add-device.component';
import { AddAndEditLocationComponent } from './location/add-edit-location/add-edit-location.component';
import { DeviceTypeComponent } from './devices/device-type/device-type.component';
import { DeviceComponent } from './devices/device/device.component';
import { LocationComponent } from './location/location.component';
import { ThresholdComponent } from './threshold/threshold.component';
import { DeviceReadingTypesComponent } from './device-reading-types/device-reading-types.component';

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
    path: "device-add",
    component: AddDeviceComponent
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
    path: "device-reading-types",
    component: DeviceReadingTypesComponent
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
