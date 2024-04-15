import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@microsoft/signalr';
import { Observable } from 'rxjs';
import { ConfigService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  protected apiURL: string = "";

  constructor(private http : HttpClient, private config: ConfigService) {
    if (config.serverSettings) {
      this.apiURL = `${config.serverSettings.webApiUrl}Login`;
    }
   }

  // login(data: HttpRequest) : Observable<any>{
  //   console.log("server");
  //   return this.http.post(`${this.apiURL}`, data);
  // }
}
