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

  async getToken(): Promise<string> {
    let token: string | PromiseLike<string>;
    await this.storage.get('ACCESS_TOKEN').then(data => { token = data; });
    return token;
  }

  async checkToken(): Promise<boolean> {
    return await this.getToken() !== null;
  }

  async loadObj(key: string): Promise<object[]> {
    return this.storage.get(key);
  }

  async saveObjs(key: string, objs: object[]): Promise<void> {
    await this.storage.set(key, objs);
  }

  async loadMode(key: string): Promise<boolean> {
    return this.storage.get(key);
  }

  async saveMode(key: string, objs: boolean): Promise<void> {
    await this.storage.set(key, objs);
  }

  async loadInfo(key: string): Promise<any> {
    return this.storage.get(key);
  }

  async saveInfo(key: string, objs: any): Promise<void> {
    await this.storage.set(key, objs);
  }
}
