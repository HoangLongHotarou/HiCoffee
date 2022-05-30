import { Injectable } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { FetchAPIService } from '../fetch-api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  category$: Category[];

  constructor(
    private fetchAPI: FetchAPIService
  ) { }

  async getAll(): Promise<any> {
    await this.fetchAPI.get(`location/categories/`).then((res) => {
      this.category$ = res.data;
    }).catch((res) => {
      console.log(res);
    });
    return this.category$;
  }
}
