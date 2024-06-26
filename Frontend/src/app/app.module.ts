import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { LocationComponent } from './location/location.component';
import { LocationService } from './services/location.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DeviceComponent } from './devices/device/device.component';
import { ConfigService } from './services/configuration.service';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AddEditDeviceComponent } from './devices/add-edit-device/add-edit-device.component';
import { MatSelectModule } from '@angular/material/select';
import { DeviceTypeComponent } from './devices/device-type/device-type.component';
import { DeviceTypeService } from './services/device-type.service';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddAndEditLocationComponent } from './location/add-edit-location/add-edit-location.component';
import { DialogDeviceTypeComponent } from './devices/device-type/dialog-device-type/dialog-device-type.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfirmationDialogComponent } from './devices/device-type/confirmation-dialog/confirmation-dialog.component';
import { DeleteConfirmationComponent } from './devices/device-type/delete-confirmation/delete-confirmation.component';
import { MapComponent } from './map/map.component';
import { MatSortModule } from '@angular/material/sort';
import { DeviceReadingTypesComponent } from './device-reading-types/device-reading-types.component';
import { DeviceReadingTypeDialogComponent } from './device-reading-types/device-reading-type-dialog/device-reading-type-dialog.component';
import { AddThresholdComponent } from './add-threshold/add-threshold.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ThresholdComponent } from './threshold/threshold.component';
import { ToastrModule } from 'ngx-toastr';
import { UserComponent } from './user/user.component';
import { MatBadgeModule } from '@angular/material/badge';
import { AddDeviceMaintenanceComponent } from './add-device-maintenance/add-device-maintenance.component';
import { MaintenanceService } from './services/maintenance.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ImageDialogComponent } from './devices/image-dialog/image-dialog.component';
import { MaintenanceComponent } from './devices/maintenance/maintenance.component';
import { AddEditUserComponent } from './users/add-edit-user/add-edit-user.component';
import { DashoardComponent } from './dashoard/dashoard.component';
import { DashboardMapComponent } from './dashboard-map/dashboard-map.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableExporterModule } from 'mat-table-exporter';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { AuthService } from './services/auth.service';
import { MarkerService } from './services/marker.service';
import { TodosComponent } from './todos/todos.component';
import { OnGoingMaintenanceComponent } from './on-going-maintenance/on-going-maintenance.component';
import { DeletedTodoComponent } from './deleted-todo/deleted-todo.component';
import { OtpComponent } from './otp/otp.component';
const appInitializer = (appConfig: ConfigService) => {
  return () => {
    return appConfig.loadConfigurations();
  };
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodosComponent,
    DeletedTodoComponent,
    OnGoingMaintenanceComponent,
    LocationComponent,
    DeviceComponent,
    AddEditDeviceComponent,
    NavMenuComponent,
    AddAndEditLocationComponent,
    DeviceTypeComponent,
    DialogDeviceTypeComponent,
    DeleteConfirmationComponent,
    ConfirmationDialogComponent,
    MapComponent,
    DeviceReadingTypesComponent,
    DeviceReadingTypeDialogComponent,
    DialogDeviceTypeComponent,
    AddThresholdComponent,
    DeleteConfirmationComponent,
    ConfirmationDialogComponent,
    ThresholdComponent,
    UserComponent,
    AddDeviceMaintenanceComponent,
    ImageDialogComponent,
    MaintenanceComponent,
    AddEditUserComponent,
    DashoardComponent,
    DashboardMapComponent,
    MaintenanceComponent,
    LoginComponent,
    LayoutComponent,
    LoginAdminComponent,
    OtpComponent
  ],
  imports: [
    MatBadgeModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatInputModule,
    MatDividerModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    MatDividerModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatTableExporterModule,
    MatIconModule,
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [ConfigService] },
    LocationService,
    DeviceTypeService,
    MaintenanceService,
    AuthService,
    MarkerService,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
