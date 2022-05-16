import { FetchAPIService } from './fetch-api.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { UserCreate } from './../interfaces/auth/usercreate';
import { User } from './../interfaces/auth/user';
import { Injectable } from '@angular/core';
import { UserLogin } from '../interfaces/auth/userlogin';
import { LocalStoreService } from './localstore.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);;
  user: User;

  constructor(private fetchAPI: FetchAPIService, public localStore: LocalStoreService) { }

  async signUp(user: UserCreate) {
    await this.fetchAPI.post('auth/users/', user).then((res) => {
      console.log(res.data);
      user = res.data;
    });
    console.log(user);
  }

  async login(user: UserLogin): Promise<boolean> {
    let check = true;
    if (await this.localStore.checkToken() === false) {
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
    this.isAuthenticated.next(false);
    console.log(this.isAuthenticated.value);
  }
}
