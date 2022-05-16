import { TestBed } from '@angular/core/testing';

import { LocalStoreService } from './localstore.service';

describe('LocalStoreService', () => {
  let service: LocalStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
