import { Pagination } from 'src/app/interfaces/pagination';
/* eslint-disable @typescript-eslint/naming-convention */
import { FavoriteOrCheckIn } from 'src/app/interfaces/favorite-or-check-in';
import { LocalStoreService } from '../localstore.service';
import { Injectable } from '@angular/core';
import { FetchAPIService } from '../fetch-api.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteOrCheckInService {
  private frOrCi$: FavoriteOrCheckIn[] = [];
  private pagination: Pagination;
  // private ffOrCi: FavoriteOrCheckIn

  constructor(private localStore: LocalStoreService, private fetchApi: FetchAPIService) { }

  async getAll(type: number): Promise<FavoriteOrCheckIn[]> {
    await this.fetchApi.get(`customer/marker/?type=${type}`, true).then((res) => {
      this.pagination = res.data;
      this.frOrCi$ = this.pagination.results;
    });
    return this.frOrCi$;
  }

  async check(id: number, t: number) {
    const mark = { coffee_shop: id, type: t };
    this.fetchApi.post('customer/marker/', mark, true).then((res) => {
      console.log(res.status);
    });
  }

  async unCheck(id: number, t: number) {
    // const mark = { coffee_shop: id, type: t };
    this.fetchApi.delete('customer/marker/', 13, true).then((res) => {
      console.log(res.status);
    });
  }
}
