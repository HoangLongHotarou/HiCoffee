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
    private errorUtil: InformErrorUtils
  ) { }

  async getInformation(): Promise<void> {
    await this.fetchAPI.get(`customer/information/me/`, true).then(async (res) => {
      this.info = res.data;
      await this.localStore.saveInfo('info', this.info);
    });
  }

  async signUpOwnerCoffee(role: any): Promise<boolean> {
    let check = true;
    await this.fetchAPI.put('customer/information/', role, 'role', true).then(async (res) => {
      console.log(res);
      if (res.status === 200) {
        role = res.data;
      } else if (res.status === 401) {
        this.auth.logout();
        await this.errorUtil.unauthenticated();
      }
      else {
        check = false;
      }
    });
    return check;
  }
}
