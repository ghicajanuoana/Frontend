import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OTP } from '../models/otp.model';
import { OtpService } from '../services/otp.service';
import emailjs from '@emailjs/browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
})
export class OtpComponent implements OnInit{

  encryptedOTP: OTP = new OTP();
  timeLeft: number = 40; 

  responseOTP: string = "";
  expireTime = this.timeLeft;

  constructor(private otpService: OtpService, private toastr: ToastrService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

  

  async send(){
    emailjs.init('xtbjbY_Rz7kotWYSh');
        let response = await emailjs.send('Email_OTP', 'template_7l37jmu', {
        otpName: this.encryptedOTP.otpName,
        subject: `OTP verification ${this.encryptedOTP.otpName}`,
        });

    this.toastr.success('Message to Admin has been sent!');
  }

  generateOTPOnClick(): void {
    this.otpService.getOTP().subscribe({
      next: async resp => {
        this.encryptedOTP = resp;   
        this.send();
        this.startTimer();     
      },
      error: error =>{
        console.error('Error generating OTP:', error);
      }
    })
  }

  verifyResponse(): void{
    if(this.responseOTP == this.encryptedOTP.otpName && this.encryptedOTP.otpName != ""){
      this.toastr.success("Correct OTP.");
      this.toastr.success("User deleted!");
      this.router.navigate(['users']);
    }else {
      this.toastr.clear();
      this.toastr.error("OTP code is incorrect. Generate again!");     
      this.responseOTP = "";
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }

  startTimer(): void {
    const interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 40;
        clearInterval(interval); 
      }
    }, 1000);
  }
}


