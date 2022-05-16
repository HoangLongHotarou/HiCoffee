/* eslint-disable @typescript-eslint/naming-convention */
import { UserCreate } from './../interfaces/auth/usercreate';
import { Injectable } from '@angular/core';
import { Http, HttpResponse } from '@capacitor-community/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchAPIService {
  private resourceUrl = environment.apiHiCoffee.apiLocalhost;
  constructor() { }

  findAll(urls: string): Promise<HttpResponse> {
    const options = {
      url: `${this.resourceUrl + urls}`,
      headers: { 'Content-Type': 'application/json' }
    };
    return Http.get(options);
  }

  find(urls: string, id: number): Promise<HttpResponse> {
    const options = {
      url: `${this.resourceUrl + urls}${id}`,
      headers: { 'Content-Type': 'application/json' }
    };
    return Http.get(options);
  }

  post(urls: string, o: object): Promise<HttpResponse> {
    const options = {
      url: `${this.resourceUrl + urls}`,
      data: o,
      headers: { 'Content-Type': 'application/json' }
    };
    return Http.post(options);
  }

  put(urls: string, o: object, id: number): Promise<HttpResponse> {
    const options = {
      url: `${this.resourceUrl + urls}${id}`,
      data: o,
      headers: { 'Content-Type': 'application/json' }
    };
    return Http.put(options);
  }
}
