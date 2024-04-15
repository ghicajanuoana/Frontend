import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Maintenance } from "../models/maintenance.model"
import { ConfigService } from "./configuration.service"
import { header } from "./global.service";
import { PagedList } from "../models/paged-list.model";
import { DashboardMap } from "../models/dashboard-map.model";
import { MaintenanceParameters } from "../models/maintenance-parameters.model";

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  protected apiURL: string = "";

  constructor(protected http: HttpClient, private config: ConfigService) {
    if (config.serverSettings) {
      this.apiURL = `${config.serverSettings.webApiUrl}DeviceMaintenance`;
    }
  }

  getMaintenancesPaged(maintenanceParameters: MaintenanceParameters) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("Device", String(maintenanceParameters.device));
    queryParams = queryParams.append("Description", String(maintenanceParameters.description));
    queryParams = queryParams.append("Outcome", String(maintenanceParameters.outcome));
    queryParams = queryParams.append("Status", maintenanceParameters.status);
    queryParams = queryParams.append("ScheduledDateStart", String(maintenanceParameters.scheduledDateStart));
    queryParams = queryParams.append("ScheduledDateEnd", String(maintenanceParameters.scheduledDateEnd));
    queryParams = queryParams.append("ActualDateStart", String(maintenanceParameters.actualDateStart));
    queryParams = queryParams.append("ActualDateEnd", String(maintenanceParameters.actualDateEnd));
    queryParams = queryParams.append("CreatedAtStart", String(maintenanceParameters.createdAtStart));
    queryParams = queryParams.append("CreatedAtEnd", String(maintenanceParameters.createdAtEnd));
    queryParams = queryParams.append("CreatedBy", String(maintenanceParameters.createdBy));
    queryParams = queryParams.append("pagingFilteringParameters.pageNumber", maintenanceParameters.pageNumber);
    queryParams = queryParams.append("pagingFilteringParameters.orderBy", String(maintenanceParameters.orderBy));
    queryParams = queryParams.append("pagingFilteringParameters.orderDescending", String(maintenanceParameters.orderDescending));
    queryParams = queryParams.append("pagingFilteringParameters.pageSize", maintenanceParameters.pageSize);
    return this.http.get<PagedList>(`${this.apiURL}/getDeviceMaintenancesPaged?${queryParams}`, header)
  }

  addMaintenance(maintenance: Maintenance) {
    //const formData = new FormData();
    //formData.append('id', String(maintenance.id));
    //formData.append('deviceId', String(maintenance.device.deviceId));   //maintenance.deviceId
    //formData.append('Device.Name', maintenance.device.name);
    //formData.append('Device.SerialNumber', maintenance.device.serialNumber);
    //formData.append('Device.Description', maintenance.device.description);
    //formData.append('Location.LocationId', maintenance.device.location.locationId);
    //formData.append('Location.Name', maintenance.device.location.name);
    //formData.append('Location.City', maintenance.device.location.city);
    //formData.append('Location.Address', maintenance.device.location.address);
    //formData.append('Location.Country', maintenance.device.location.country);
    //formData.append('Location.IsLocationUsed', maintenance.device.location.isLocationUsed);
    //formData.append('DeviceType.DeviceTypeId', maintenance.device.deviceType.deviceTypeId);
    //formData.append('DeviceType.Name', maintenance.device.deviceType.name);
    //formData.append('scheduledDate', String(maintenance.scheduledDate));
    //formData.append('description', String(maintenance.description));
    return this.http.post(`${this.apiURL}/AddMaintenance`, maintenance, header)
    //return this.http.post(`${this.apiURL}/AddMaintenance`, formData);
  }

  deleteMaintenance(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.delete(`${this.apiURL}/delete/${id}`, { headers, responseType: 'text' })
}

  getDashboardMap() {
    return this.http.get<DashboardMap[]>(`${this.apiURL}/getAllMaintenances`, header)
  }

  getAllMaintenances() {
    return this.http.get<Maintenance[]>(`${this.apiURL}/getAllMaintenances`, header)
  }

  getMaintenance(id: number) {
    return this.http.get<Maintenance>(`${this.apiURL}/${id}`, header)
  }

  updateMaintenance(maintenance: Maintenance){
    return this.http.put<Maintenance>(`${this.apiURL}/update`, maintenance, header)
  }
}
