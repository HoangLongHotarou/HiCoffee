/* eslint-disable @typescript-eslint/naming-convention */
import { UserCreate } from '../interfaces/auth.interface/usercreate';
import { Injectable } from '@angular/core';
import { Http, HttpResponse } from '@capacitor-community/http';
import { environment } from 'src/environments/environment';
import { LocalStoreService } from './localstore.service';

@Injectable({
  providedIn: 'root'
})
export class FetchAPIService {
  private resourceUrl = environment.apiHiCoffee.apiHeroku;
  constructor(private localStore: LocalStoreService) { }

  findAll(urls: string): Promise<HttpResponse> {
    const options = {
      url: `${this.resourceUrl + urls}`,
      headers: { 'Content-Type': 'application/json' }
    };
    return Http.get(options);
  }

  async findAllJWT(urls: string): Promise<HttpResponse> {
    // console.log(this.localStore.getToken());
    const options = {
      url: `${this.resourceUrl + urls}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${await this.localStore.getToken()}`
      }
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

  findJWT(urls: string, id: number): Promise<HttpResponse> {
    const options = {
      url: `${this.resourceUrl + urls}${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.localStore.getToken()}`
      }
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

  postFile(urls: string, o: any): Promise<HttpResponse> {
    const options = {
      url: `${this.resourceUrl + urls}`,
      data: o,
      headers: { 'Content-Type': 'application/json' }
    };
    return Http.post(options);
  }

  postJWT(urls: string, o: object): Promise<HttpResponse> {
    const options = {
      url: `${this.resourceUrl + urls}`,
      data: o,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.localStore.getToken()}`
      }
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

  putJWT(urls: string, o: object, id: number): Promise<HttpResponse> {
    const options = {
      url: `${this.resourceUrl + urls}${id}`,
      data: o,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.localStore.getToken()}`
      }
    };
    return Http.put(options);
  }
}
