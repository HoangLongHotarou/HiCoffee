import { FetchAPIService } from './fetch-api.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { UserCreate } from '../interfaces/auth.interface/usercreate';
import { User } from '../interfaces/auth.interface/user';
import { Injectable } from '@angular/core';
import { UserLogin } from '../interfaces/auth.interface/userlogin';
import { LocalStoreService } from './localstore.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(private fetchAPI: FetchAPIService, private localStore: LocalStoreService) { }

  async checkLogin(): Promise<boolean> {
    return this.localStore.checkToken();
  }

  async signUp(user: UserCreate): Promise<boolean> {
    let check = true;
    await this.fetchAPI.post('auth/users/', user).then((res) => {
      // console.log(res.data);
      // user = res.data;
      if (res.status === 200) {
        user = res.data;
        console.log(user);
      } else {
        check = false;
      }
    });
    // console.log(user);
    return check;
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
