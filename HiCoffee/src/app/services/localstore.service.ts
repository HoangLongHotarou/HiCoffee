import { Hobby } from './../interfaces/hobby';
/* eslint-disable @typescript-eslint/naming-convention */
import { Information } from 'src/app/interfaces/infomation';
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

  async deleteInfo(): Promise<void> {
    await this.storage.remove('info');
  }

  async checkHadHobbies(): Promise<boolean> {
    const info: Information = await this.loadInfo('info');
    if (info.info_hobbies.length === 0) { return false; }
    return true;
  }

  async isFavoriteOrCheckIn(idCoffeeShop: number, type: number) {
    const info: Information = await this.storage.get('info');
    if (info === null || info === undefined) { return 0; }
    const lstFavorites = info.info_marks.filter(
      (x) => (x.coffee_shop === idCoffeeShop && x.type === type)
    );
    const id = lstFavorites.length > 0 ? lstFavorites[0].id : 0;
    return id;
  }

  async setFavoriteOrCheckIn(id: number, isFavorite: boolean, type?: number, coffee_shop?: number) {
    const info: Information = await this.storage.get('info');
    let lstFavorites;
    if (isFavorite === false) {
      lstFavorites = info.info_marks.filter(
        (x) => (x.id !== id)
      );
    } else {
      lstFavorites = [...info.info_marks, { id, coffee_shop, type }];
    }
    info.info_marks = lstFavorites;
    await this.saveInfo('info', info);
  }

  async setHobbies(hobbies: Hobby[]) {
    const info: Information = await this.storage.get('info');
    info.info_hobbies = hobbies;
    await this.saveInfo('info', info);
  }

  async getHobbies(): Promise<string> {
    const info: Information = await this.storage.get('info');
    // console.log(info);
    if (info === undefined || info === null) { return ''; }
    const ids = info.info_hobbies.map(x => x.category.id).toString();
    return ids;
  }
}
