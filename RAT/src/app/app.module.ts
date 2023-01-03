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
import { DeviceTypeComponent } from './devices/device-type/device-type.component';
import { DeviceTypeService } from './services/device-type.service';
import { MatIconModule } from '@angular/material/icon'; 
import { MatExpansionModule} from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddLocationComponent } from './location/add-location/add-location.component';

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
    NavMenuComponent,
    AddLocationComponent,
    DeviceTypeComponent
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
    MatDividerModule
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
