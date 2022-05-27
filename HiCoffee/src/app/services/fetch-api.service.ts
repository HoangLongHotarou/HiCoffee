/* eslint-disable @typescript-eslint/naming-convention */
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

  async get(urls: string, checkAuth?: boolean): Promise<HttpResponse> {
    let auth = '';
    if (checkAuth === true) {
      auth = `JWT ${await this.localStore.getToken()}`;
    }
    const options = {
      url: `${this.resourceUrl + urls}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth
      }
    };
    return Http.get(options);
  }

  async delete(urls: string, id: number, checkAuth?: boolean): Promise<HttpResponse> {
    let auth = '';
    if (checkAuth === true) {
      auth = `JWT ${await this.localStore.getToken()}`;
    }
    const options = {
      url: `${this.resourceUrl + urls}${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth
      }
    };
    return Http.del(options);
  }

  async post(urls: string, o: object, checkAuth?: boolean): Promise<HttpResponse> {
    let auth = '';
    if (checkAuth === true) {
      auth = `JWT ${await this.localStore.getToken()}`;
    }
    const options = {
      url: `${this.resourceUrl + urls}`,
      data: o,
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth
      }
    };
    return Http.post(options);
  }

  async postFormData(urls: string, o: any, checkAuth?: boolean): Promise<HttpResponse> {
    let auth = '';
    if (checkAuth === true) {
      auth = `JWT ${await this.localStore.getToken()}`;
    }
    const options = {
      url: `${this.resourceUrl + urls}`,
      data: o,
      headers: {
        'Content-Type': 'multipart/form-data;  boundary=----WebKitFormBoundarydMIgtiA2YeB1Z0kl',
        Authorization: auth
      }
    };
    return Http.post(options);
  }

  async put(urls: string, o: object, id: any, checkAuth?: boolean): Promise<HttpResponse> {
    let auth = '';
    if (checkAuth === true) {
      auth = `JWT ${await this.localStore.getToken()}`;
    }
    const options = {
      url: `${this.resourceUrl + urls}${id}/`,
      data: o,
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth
      }
    };
    return Http.put(options);
  }

  async putFormData(urls: string, o: any, id: number, checkAuth?: boolean): Promise<HttpResponse> {
    let auth = '';
    if (checkAuth === true) {
      auth = `JWT ${await this.localStore.getToken()}`;
    }
    const options = {
      url: `${this.resourceUrl + urls}${id}/`,
      data: o,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: auth
      }
    };
    return Http.put(options);
  }
}
