import { TestBed } from '@angular/core/testing';

import { TestValidatorService } from './test-validator.service';

describe('TestValidatorService', () => {
  let service: TestValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
