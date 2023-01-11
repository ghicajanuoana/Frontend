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
import { AddDeviceComponent } from './device/add-device/add-device.component';
import { MatSelectModule } from '@angular/material/select';
import { DeviceTypeComponent } from './devices/device-type/device-type.component';
import { DeviceTypeService } from './services/device-type.service';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddAndEditLocationComponent } from './location/add-edit-location/add-edit-location.component';
import { DialogDeviceTypeComponent } from './dialog-device-type/dialog-device-type.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfirmationDialogComponent } from './devices/device-type/confirmation-dialog/confirmation-dialog.component';
import { DeleteConfirmationComponent } from './devices/device-type/delete-confirmation/delete-confirmation.component';
import { MapComponent } from './map/map.component';
import { DialogUpdateDeviceTypeComponent } from './devices/dialog-update-device-type/dialog-update-device-type.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ToastrModule } from 'ngx-toastr';


const appInitializer = (appConfig: ConfigService) => {
  return () => {
    return appConfig.loadConfigurations();
  };
};

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    DeviceComponent,
    AddDeviceComponent,
    NavMenuComponent,
    AddAndEditLocationComponent,
    DeviceTypeComponent,
    DialogDeviceTypeComponent,
    DeleteConfirmationComponent,
    ConfirmationDialogComponent,
    MapComponent,
    DialogUpdateDeviceTypeComponent
  ],
  imports: [
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
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [ConfigService] },
    LocationService,
    DeviceTypeService,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
