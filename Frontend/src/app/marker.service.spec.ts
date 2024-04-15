import { TestBed } from '@angular/core/testing';

import { MarkerService } from './services/marker.service';

describe('MarkerService', () => {
  let service: MarkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
