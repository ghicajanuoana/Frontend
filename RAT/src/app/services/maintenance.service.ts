import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Maintenance } from "../models/maintenance.model"
import { ConfigService } from "./configuration.service"
import { header } from "./global.service";
import { PagedList } from "../models/paged-list.model";

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

  getMaintenancesPaged(pageNumber: number, pageSize: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageNumber", String(pageNumber));
    queryParams = queryParams.append("pageSize", String(pageSize));
    return this.http.get<PagedList>(`${this.apiURL}/getDeviceMaintenancesPaged?${queryParams}`, header)
  }

  addMaintenance(maintenance: Maintenance) {
    return this.http.post(`${this.apiURL}/Add`, maintenance, header)
  }
}
