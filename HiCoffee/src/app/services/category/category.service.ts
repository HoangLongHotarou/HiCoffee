import { Injectable } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import InformErrorUtils from 'src/app/utils/inform-error.utils';
import { FetchAPIService } from '../fetch-api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  category$: Category[];

  constructor(
    private fetchAPI: FetchAPIService,
    private informError: InformErrorUtils
  ) { }

  async getAll(): Promise<any> {
    await this.fetchAPI.get(`location/categories/`).then((res) => {
      this.category$ = res.data;
    }).catch((err) => {
      this.informError.catchError(err.response.status);
    });
    return this.category$;
  }

  async addCategory(idcoffee: number, category: any): Promise<boolean> {
    let check = false;
    await this.fetchAPI.post(`customer/cfsowner/${idcoffee}/cfstypes/`, category, true).then((res) => {
      category = res.data;
      check = true;
    }).catch((err) => {
      this.informError.catchError(err.response.status);
    });
    return check;
  }
}
