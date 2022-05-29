import { FetchAPIService } from '../fetch-api.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { User } from '../../interfaces/user';
import { Injectable } from '@angular/core';
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

  async signUp(user: User): Promise<Array<any>> {
    let check = true;
    let err = '';
    await this.fetchAPI.post('auth/users/', user).then((res) => {
      user = res.data;
    }).catch((error) => {
      console.log(error);
      const response = error.response;
      if (response.status === 400) {
        if (response.data.email) {
          err += '<p>Email đã tồn tại</p>';
        }
        if (response.data.password) {
          err += '<p>Password sai theo quy định</p>';
        }
        if (response.data.username) {
          err += '<p>Username đã tồn tại</p>';
        }
      } else {
        err = '<p>Chưa kết nối mạng</p>';
      }
      check = false;
    });
    return [err, check];
  }

  async login(user: User): Promise<boolean> {
    let check = true;
    if (await this.checkLogin() === false) {
      await this.fetchAPI.post('auth/jwt/create/', user).then(
        (res) => {
          this.localStore.addToken(res.data.access);
        }
      ).catch((err) => {
        check = false;
      });
    }
    return check;
  }

  async logout() {
    await this.localStore.deleteToken();
  }
}
