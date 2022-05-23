import { TestBed } from '@angular/core/testing';

import { FavoriteOrCheckInService } from './favorite-or-check-in.service';

describe('FavoriteOrCheckInService', () => {
  let service: FavoriteOrCheckInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteOrCheckInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
