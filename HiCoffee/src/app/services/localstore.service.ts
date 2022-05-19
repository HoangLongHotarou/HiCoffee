import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {

  constructor(private storage: Storage) { }

  async addToken(token: string): Promise<void> {
    await this.storage.set('ACCESS_TOKEN', token);
  }

  async deleteToken(): Promise<void> {
    await this.storage.remove('ACCESS_TOKEN');
  }

  async getToken(): Promise<string>{
    let token: string | PromiseLike<string>;
    await this.storage.get('ACCESS_TOKEN').then(data=>{token = data;});
    console.log('test',token);
    return token;
  }

  async checkToken(): Promise<boolean> {
    return await this.getToken() !== null;
  }
}
