import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceTypeComponent } from './devices/device-type/device-type.component';
import { DeviceComponent } from './devices/device/device.component';
import { LocationComponent } from './location/location.component';

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
    path: "devices",
    component: DeviceComponent
  },
  {
    path: "device-types",
    component: DeviceTypeComponent
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
