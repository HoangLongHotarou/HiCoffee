import { TestBed } from '@angular/core/testing';

import { CheckHobbiesGuard } from './check-hobbies.guard';

describe('CheckHobbiesGuard', () => {
  let guard: CheckHobbiesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckHobbiesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
