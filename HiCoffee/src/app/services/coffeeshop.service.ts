import { Injectable } from '@angular/core';
import { Http, HttpResponse } from '@capacitor-community/http';
import { CoffeeShop } from '../interfaces/coffeeshop';

@Injectable({
  providedIn: 'root'
})
export class CoffeeShopService {
  private resourceUrl = 'https://hicoffeeapi.herokuapp.com/location/coffeeshop/';
  constructor() { }

  findAll(): Promise<HttpResponse> {
    const options = {
      url: `${this.resourceUrl}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: { 'Content-Type': 'application/json' }
    };
    return Http.get(options);
  }

}
