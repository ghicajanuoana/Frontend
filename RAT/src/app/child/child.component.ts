import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Input() childItem = ''
  @Output() sendToParent = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
    this.childIsCreated("yes")
  }

  childIsCreated(value: string) {
    console.log("Sending data from child")
    this.sendToParent.emit(value);
  }
}
