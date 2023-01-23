import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeviceMaintenanceComponent } from './add-device-maintenance.component';

describe('AddDeviceMaintenanceComponent', () => {
  let component: AddDeviceMaintenanceComponent;
  let fixture: ComponentFixture<AddDeviceMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDeviceMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeviceMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
