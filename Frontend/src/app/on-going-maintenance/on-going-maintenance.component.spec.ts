import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnGoingMaintenanceComponent } from './on-going-maintenance.component';

describe('OnGoingMaintenanceComponent', () => {
  let component: OnGoingMaintenanceComponent;
  let fixture: ComponentFixture<OnGoingMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnGoingMaintenanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnGoingMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
