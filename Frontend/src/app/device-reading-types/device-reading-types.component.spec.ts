import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceReadingTypesComponent } from './device-reading-types.component';

describe('DeviceReadingTypesComponent', () => {
  let component: DeviceReadingTypesComponent;
  let fixture: ComponentFixture<DeviceReadingTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceReadingTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceReadingTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
