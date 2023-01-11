import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceReadingTypeDialogComponent } from './device-reading-type-dialog.component';

describe('DeviceReadingTypeDialogComponent', () => {
  let component: DeviceReadingTypeDialogComponent;
  let fixture: ComponentFixture<DeviceReadingTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceReadingTypeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceReadingTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
