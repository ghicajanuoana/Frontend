import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeviceTypeComponent } from './dialog-device-type.component';

describe('DialogDeviceTypeComponent', () => {
  let component: DialogDeviceTypeComponent;
  let fixture: ComponentFixture<DialogDeviceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeviceTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeviceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
