import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http"
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string = "https://localhost:7137/api/User/";

  constructor(private http : HttpClient, private router: Router) {
   }

  login(loginObj : any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj)
  }
}
