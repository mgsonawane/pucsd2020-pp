import { TestBed } from '@angular/core/testing';

import { SeraclService } from './seracl.service';

describe('SeraclService', () => {
  let service: SeraclService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeraclService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
