import { TestBed } from '@angular/core/testing';

import { CoffeeShopService } from './coffee-shop.service';

describe('CoffeeShopService', () => {
  let service: CoffeeShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoffeeShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
