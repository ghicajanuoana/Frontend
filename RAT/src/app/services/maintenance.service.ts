import { HttpClient, HttpParams } from "@angular/common/http"
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
    return this.http.post(`${this.apiURL}/Add`, maintenance, header)
  }

  getDashboardMap() {
    return this.http.get<DashboardMap[]>(`${this.apiURL}/getAllMaintenancesDashboard`, header)
  }
}
