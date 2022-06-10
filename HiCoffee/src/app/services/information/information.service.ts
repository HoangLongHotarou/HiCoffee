import { AuthService } from './../auth/auth.service';
import { Information } from '../../interfaces/infomation';
import { LocalStoreService } from 'src/app/services/localstore.service';
import { Injectable } from '@angular/core';
import { FetchAPIService } from '../fetch-api.service';
import InformErrorUtils from 'src/app/utils/inform-error.utils';

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  info: Information;

  constructor(
    private fetchAPI: FetchAPIService,
    private localStore: LocalStoreService,
    private auth: AuthService,
    private errorUtil: InformErrorUtils,
  ) { }

  async saveLocalInformation(): Promise<void> {
    await this.fetchAPI.get(`customer/information/me/`, true).then(async (res) => {
      this.info = res.data;
      await this.localStore.saveInfo('info', this.info);
    }).catch((error) => { this.errorUtil.catchError(error.response.status); });
  }

  async signUpOwnerCoffee(role: any): Promise<boolean> {
    let check = false;
    await this.fetchAPI.put('customer/information/', role, 'role', true).then(
      async (res) => {
        console.log(res);
        role = res.data;
        check = true;
      }).catch((error) => {
        this.errorUtil.catchError(error.response.status);
        check = false;
      });
    return check;
  }

  async signUpCoffee(coffee: any): Promise<number> {
    let id = 0;
    await this.fetchAPI.postFormData('customer/cfsowner/', coffee, true).then(
      async (res) => {
        coffee = res.data;
        id = coffee.id;
      }).catch((error) => {
        this.errorUtil.catchError(error.response.status);
        //console.log(error);
        
      });
    return id;
  }

  async updateCoffee(coffee: any, id: number): Promise<number> {
    let idCafe = 0;
    await this.fetchAPI.putFormData('customer/cfsowner/', coffee, id, true).then(
      async (res) => {
        coffee = res.data;
        idCafe = id;
        console.log(coffee);
        
      }).catch((error) => {
        //this.errorUtil.catchError(error.response.status);
        console.log(error);

      });
    return idCafe;
  }
}
