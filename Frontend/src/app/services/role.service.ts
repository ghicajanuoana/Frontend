import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Role } from "../models/role.model";
import { ConfigService } from "./configuration.service";
import { header } from "./global.service";

@Injectable({ providedIn: 'root' })
export class RoleService{

    protected apiURL: string = "";

    constructor(protected http: HttpClient, private config: ConfigService) {
        if(config.serverSettings){
            this.apiURL = `${config.serverSettings.webApiUrl}role`;
        }
    }

    getAllRoles() {
        return this.http.get<Role[]>(`${this.apiURL}/getAll`, header)
    }
}