import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  gotoLocation() {
    this.router.navigate(["/location"])
  }
}
