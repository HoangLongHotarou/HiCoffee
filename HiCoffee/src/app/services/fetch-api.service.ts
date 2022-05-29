/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStoreService } from './localstore.service';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class FetchAPIService {
  private resourceUrl = environment.apiHiCoffee.apiHeroku;
  constructor(private localStore: LocalStoreService) { }

  async get(urls: string, checkAuth?: boolean) {
    let auth = '';
    if (checkAuth === true) {
      auth = `JWT ${await this.localStore.getToken()}`;
    }
    return axios.get(`${this.resourceUrl + urls}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth
        }
      });
  }

  async delete(urls: string, id: number, checkAuth?: boolean) {
    let auth = '';
    if (checkAuth === true) {
      auth = `JWT ${await this.localStore.getToken()}`;
    }
    return axios.delete(`${this.resourceUrl + urls}${id}/`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth
        }
      });
  }

  async post(urls: string, o: object, checkAuth?: boolean) {
    let auth = '';
    if (checkAuth === true) {
      auth = `JWT ${await this.localStore.getToken()}`;
    }
    return axios.post(`${this.resourceUrl + urls}`, o,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth
        }
      });
  }

  async postFormData(urls: string, o: FormData, checkAuth?: boolean) {
    let auth = '';
    if (checkAuth === true) {
      auth = `JWT ${await this.localStore.getToken()}`;
    }
    return axios.post(`${this.resourceUrl + urls}`, o,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: auth
        }
      });
  }

  async put(urls: string, o: object, id: any, checkAuth?: boolean) {
    let auth = '';
    if (checkAuth === true) {
      auth = `JWT ${await this.localStore.getToken()}`;
    }
    return axios.put(`${this.resourceUrl + urls}${id}/`, o,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth
        }
      });
  }

  async putFormData(urls: string, o: any, id: number, checkAuth?: boolean) {
    let auth = '';
    if (checkAuth === true) {
      auth = `JWT ${await this.localStore.getToken()}`;
    }
    return axios.put(`${this.resourceUrl + urls}${id}/`, o,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: auth
        }
      });
  }

  // async postFormData(urls: string, o: FormData, checkAuth?: boolean): Promise<any> {
  //   let auth = '';
  //   if (checkAuth === true) {
  //     auth = `JWT ${await this.localStore.getToken()}`;
  //   }
  //   const header = {
  //     headers: new HttpHeaders().set('Authorization', auth)
  //   };
  //   return this.http.post(`${this.resourceUrl + urls}`, o, header).toPromise();
  // }
}
