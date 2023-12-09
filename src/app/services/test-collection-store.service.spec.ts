import { TestBed } from '@angular/core/testing';

import { TestCollectionStoreService } from './test-collection-store.service';

describe('TestCollectionStoreService', () => {
  let service: TestCollectionStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestCollectionStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
