import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateDeviceTypeComponent } from './dialog-update-device-type.component';

describe('DialogUpdateDeviceTypeComponent', () => {
  let component: DialogUpdateDeviceTypeComponent;
  let fixture: ComponentFixture<DialogUpdateDeviceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdateDeviceTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateDeviceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
