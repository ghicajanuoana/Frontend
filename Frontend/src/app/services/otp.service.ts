
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  protected apiUrl = 'https://localhost:7137/api/OTP/getOTP'; 

  constructor(private http: HttpClient) {
  }

  getOTP(){
    return this.http.get<any>(this.apiUrl);
  }
}

