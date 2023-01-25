import { Injectable } from '@angular/core';
import { ConfigService } from './configuration.service';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { User } from '../models/user.model';
import { header } from './global.service';
import { UserAdd } from '../models/useradd.model';
import { UserParameters } from '../models/user-parameters.model';
import { PagedList } from '../models/paged-list.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected apiURL: string = "";
  constructor(protected http: HttpClient, private config: ConfigService) {
    if (config.serverSettings) {
      this.apiURL = `${config.serverSettings.webApiUrl}User`;
    }
  }

  getAllUsers() {
    return this.http.get<User[]>(`${this.apiURL}/getAll`, header)
  }

  deleteUser(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.delete(`${this.apiURL}/${id}`, { headers, responseType: 'text' })
  }

  updateUser(user: UserAdd) {
    return this.http.put<UserAdd>(`${this.apiURL}/updateUser`, user, header)
  }

  getUsersPagedAndFiltered(userParameters: UserParameters) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pagingFilteringParameters.pageNumber", String(userParameters.pageNumber));
    queryParams = queryParams.append("pagingFilteringParameters.pageSize", userParameters.pageSize);
    queryParams = queryParams.append("username", String(userParameters.username));
    if (userParameters.roleId != undefined) {
      queryParams = queryParams.append("roleId", String(userParameters.roleId));
    }
    if (userParameters.isActive != undefined) {
      queryParams = queryParams.append("isActive", Boolean(userParameters.isActive));
    }
    queryParams = queryParams.append("pagingFilteringParameters.orderBy", String(userParameters.orderBy));
    queryParams = queryParams.append("pagingFilteringParameters.orderDescending", String(userParameters.orderDescending));
    return this.http.get<PagedList>(`${this.apiURL}/getUsersPagedAndFiltered?${queryParams}`, header)
  }

  getUser(id: number) {
    return this.http.get<UserAdd>(`${this.apiURL}/${id}`, header)
  }

  addUser(user: UserAdd) {
    return this.http.post<UserAdd>(`${this.apiURL}/addUser`, user, header)
  }
}
