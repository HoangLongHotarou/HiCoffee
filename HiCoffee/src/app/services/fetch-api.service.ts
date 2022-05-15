import { Injectable } from '@angular/core';
import { Http, HttpResponse } from '@capacitor-community/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchAPIService {
  private resourceUrl = environment.apiHiCoffee.apiUrl;
  constructor() { }

  findAll(urls: string): Promise<HttpResponse> {
    const options = {
      url: `${this.resourceUrl + urls}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: { 'Content-Type': 'application/json' }
    };
    return Http.get(options);
  }

  find(urls: string, id: number): Promise<HttpResponse> {
    const options = {
      url: `${this.resourceUrl + urls}${id}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: { 'Content-Type': 'application/json' }
    };
    return Http.get(options);
  }
}
