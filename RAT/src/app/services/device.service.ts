import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { DeviceParameters } from "../models/device-parameters.model";
import { Devices } from "../models/device.model"
import { PagedList } from "../models/paged-list.model";
import { ConfigService } from "./configuration.service"
import { header } from "./global.service";

@Injectable({ providedIn: 'root' })
export class DeviceService {

    protected apiURL: string = "";
    constructor(protected http: HttpClient, private config: ConfigService) {
        if (config.serverSettings) {
            this.apiURL = `${config.serverSettings.webApiUrl}Device`;
        }
    }

    getAllDevices() {
        return this.http.get<Devices[]>(`${this.apiURL}/getAllDevices`, header)
    }

    getDevicesPagedAndFiltered(deviceParameters: DeviceParameters) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append("pagingFilteringParameters.pageNumber", String(deviceParameters.pageNumber));
        queryParams = queryParams.append("pagingFilteringParameters.pageSize", deviceParameters.pageSize);
        queryParams = queryParams.append("name", String(deviceParameters.name));
        queryParams = queryParams.append("serialNumber", String(deviceParameters.serialNumber));
        queryParams = queryParams.append("description", String(deviceParameters.description));
        queryParams = queryParams.append("deviceType", String(deviceParameters.deviceType));
        queryParams = queryParams.append("location", String(deviceParameters.location));
        queryParams = queryParams.append("pagingFilteringParameters.orderBy", String(deviceParameters.orderBy));
        queryParams = queryParams.append("pagingFilteringParameters.orderDescending", String(deviceParameters.orderDescending));
        return this.http.get<PagedList>(`${this.apiURL}/getDevicesPagedAndFiltered?${queryParams}`, header)
    }

    getDevice(id: number) {
        return this.http.get<Devices>(`${this.apiURL}/${id}`, header)
    }

    addDevice(device: Devices) {
        const formData = new FormData();
        formData.append('Name', device.name);
        formData.append('SerialNumber', device.serialNumber);
        formData.append('DeviceType.DeviceTypeId', device.deviceType.deviceTypeId);
        formData.append('DeviceType.Name', device.deviceType.name);
        formData.append('Location.LocationId', device.location.locationId);
        formData.append('Location.Name', device.location.name);
        formData.append('Location.City', device.location.city);
        formData.append('Location.Address', device.location.address);
        formData.append('Location.Country', device.location.country);
        formData.append('Location.IsLocationUsed', device.location.isLocationUsed);
        formData.append('SoftwareVersion', String(device.softwareVersion));
        formData.append('FirmwareVersion', String(device.firmwareVersion));
        formData.append('SerialNumber', String(device.serialNumber));
        formData.append('Alias', String(device.alias));
        formData.append('Emails', String(device.emails));
        formData.append('ImageFile', device.imageFile);
        formData.append('Description', String(device.description));
        return this.http.post(`${this.apiURL}/AddDevice`, formData)
    }

    deleteDevice(id: number) {
        const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
        return this.http.delete(`${this.apiURL}/${id}`, { headers, responseType: 'text' })
    }

    updateDevice(device: Devices) {
        const formData = new FormData();
        formData.append('DeviceId', String(device.deviceId));
        formData.append('Name', device.name);
        formData.append('SerialNumber', device.serialNumber);
        formData.append('DeviceType.DeviceTypeId', device.deviceType.deviceTypeId);
        formData.append('DeviceType.Name', device.deviceType.name);
        formData.append('Location.LocationId', device.location.locationId);
        formData.append('Location.Name', device.location.name);
        formData.append('Location.City', device.location.city);
        formData.append('Location.Address', device.location.address);
        formData.append('Location.Country', device.location.country);
        formData.append('Location.IsLocationUsed', device.location.isLocationUsed);
        formData.append('SoftwareVersion', String(device.softwareVersion));
        formData.append('FirmwareVersion', String(device.firmwareVersion));
        formData.append('SerialNumber', String(device.serialNumber));
        formData.append('Alias', String(device.alias));
        formData.append('Emails', String(device.emails));
        device.imageFile ? formData.append('ImageFile', device.imageFile) : formData.append('ImageBytes', device.imageBytes);
        formData.append('Description', String(device.description));
        return this.http.put<Devices>(`${this.apiURL}/updateDevice`, formData)
    }

    getAllDevicesByLocationId(id: number) {
        return this.http.get<Devices[]>(`${this.apiURL}/getDevicesByLocationId/${id}`, header)
    }
}
