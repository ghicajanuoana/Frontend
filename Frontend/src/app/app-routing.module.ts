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
import { DashoardComponent } from './dashoard/dashoard.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { DashboardMapComponent } from './dashboard-map/dashboard-map.component';
import { FormsModule } from '@angular/forms';
import { TodosComponent } from './todos/todos.component';
import { OnGoingMaintenanceComponent } from './on-going-maintenance/on-going-maintenance.component';
import { DeletedTodoComponent } from './deleted-todo/deleted-todo.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "loginAdmin",
    component: LoginAdminComponent,
  },
  {
    path: "dashboard",
    component: DashoardComponent,
    
  },
  {
    path: "todos",
    component: TodosComponent,
    
  },
  {
    path: "deleted-todos",
    component: DeletedTodoComponent,
    
  },
  {
    path: "ongoingmaintenance",
    component: OnGoingMaintenanceComponent,
    
  },
  {
    path: "dashboardmap",
    component: DashboardMapComponent,
    
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
  // {
  //   path: "alerts",
  //   component: AlertsComponent
  // },
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
    path: "add-device-maintenance",
    component: AddDeviceMaintenanceComponent,
    data: {
      isEditMode: false
    }
  },
  {
    path: "add-device-maintenance/:id",
    component: AddDeviceMaintenanceComponent,
    data: {
      isEditMode: true
    }
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
  imports: [RouterModule.forRoot(routes),
    FormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
