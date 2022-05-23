import { FetchAPIService } from '../fetch-api.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { UserCreate } from '../../interfaces/auth.interface/usercreate';
import { User } from '../../interfaces/auth.interface/user';
import { Injectable } from '@angular/core';
import { UserLogin } from '../../interfaces/auth.interface/userlogin';
import { LocalStoreService } from '../localstore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(private fetchAPI: FetchAPIService, private localStore: LocalStoreService) { }

  async checkLogin(): Promise<boolean> {
    return this.localStore.checkToken();
  }

  async signUp(user: UserCreate): Promise<Array<any>> {
    let check = true;
    let err = '';
    await this.fetchAPI.post('auth/users/', user).then((res) => {
      console.log(res.status);
      console.log(res);
      if (res.status === 201) {
        user = res.data;
      } else if (res.status === 400) {
        if (res.data.email) {
          err = 'Email đã tồn tại';
        }
        if (res.data.password) {
          err = 'Password sai theo quy định';
        }
        if (res.data.username) {
          err = 'Username đã tồn tại';
        }
        check = false;
      }
    });
    return [err, check];
  }

  async login(user: UserLogin): Promise<boolean> {
    let check = true;
    if (await this.checkLogin() === false) {
      await this.fetchAPI.post('auth/jwt/create/', user).then(
        (res) => {
          if (res.status === 200) {
            this.localStore.addToken(res.data.access);
          } else {
            check = false;
          }
        }
      );
    }
    return check;
  }

  async logout() {
    await this.localStore.deleteToken();
  }
}
