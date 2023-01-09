import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAndEditLocationComponent } from './add-edit-location.component';

describe('AddLocationPageComponent', () => {
  let component: AddAndEditLocationComponent;
  let fixture: ComponentFixture<AddAndEditLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAndEditLocationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAndEditLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
