import InformErrorUtils from 'src/app/utils/inform-error.utils';
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

  constructor(
    private localStore: LocalStoreService,
    private fetchApi: FetchAPIService,
    private informError: InformErrorUtils
  ) { }

  async getAll(type: number): Promise<FavoriteOrCheckIn[]> {
    await this.fetchApi.get(`customer/marker/?type=${type}`, true).then(async (res) => {
      this.pagination = res.data;
      this.frOrCi$ = this.pagination.results;
    }).catch(async (err) => {
      this.informError.catchError(err.response.status);
    });
    console.log(this.frOrCi$);
    return this.frOrCi$;
  }

  async isFavoriteOrCheckIn(id_cfs: number, type: number) {
    return this.localStore.isFavoriteOrCheckIn(id_cfs, type);
  }

  async checkFavoriteOrCheckIn(cfs_id: number, type: number) {
    const mark = { coffee_shop: cfs_id, type: 2 };
    let idCompleted = false;
    await this.fetchApi.post('customer/marker/', mark, true).then(async (res) => {
      await this.localStore.setFavoriteOrCheckIn(res.data.id, true, type, cfs_id);
      idCompleted = true;
    }).catch(async (err) => {
      this.informError.catchError(err.response.status);
    });
    return idCompleted;
  }

  async unCheck(idCFSCategory: number) {
    let idCompleted = false;
    await this.fetchApi.delete('customer/marker/', idCFSCategory, true).then(async (res) => {
      console.log(res);
      await this.localStore.setFavoriteOrCheckIn(idCFSCategory, false);
      idCompleted = true;
    }).catch(async (err) => {
      this.informError.catchError(err.response.status);
    });
    return idCompleted;
  }
}
