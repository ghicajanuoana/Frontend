import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeviceReadingTypeDialogComponent } from './edit-dialog.component';

describe('EditDialogComponent', () => {
  let component: EditDeviceReadingTypeDialogComponent;
  let fixture: ComponentFixture<EditDeviceReadingTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditDeviceReadingTypeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeviceReadingTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
