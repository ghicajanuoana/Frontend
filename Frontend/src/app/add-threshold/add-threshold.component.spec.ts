import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThresholdComponent } from './add-threshold.component';

describe('AddThresholdComponent', () => {
  let component: AddThresholdComponent;
  let fixture: ComponentFixture<AddThresholdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddThresholdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddThresholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
