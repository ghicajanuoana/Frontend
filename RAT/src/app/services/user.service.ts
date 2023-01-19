import { Injectable } from '@angular/core';
import { ConfigService } from './configuration.service';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { User } from '../models/user.model';
import { header } from './global.service';
import { UserAdd } from '../models/useradd.model';

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
}
