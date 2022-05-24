/* eslint-disable quote-props */
import { Pagination } from 'src/app/interfaces/pagination';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';
import { Injectable } from '@angular/core';
import { FetchAPIService } from '../fetch-api.service';
import { FeedBack } from 'src/app/interfaces/feed-back';

@Injectable({
  providedIn: 'root'
})
export class CoffeeShopService {

  coffeeShop$: CoffeeShop[];
  feedBack$: FeedBack[];
  pagination: Pagination;
  pages: number;
  constructor(private fetchAPI: FetchAPIService) { }

  async getAll(page?: number): Promise<any> {
    await this.fetchAPI.get(`location/coffeeshops/?page=${page}`).then((res) => {
      this.pagination = res.data;
      this.coffeeShop$ = this.pagination.results;
      this.pages = Math.ceil(this.pagination.count / 10);
    }).catch((res) => {
      console.log(res);
    });
    return {'coffeeShops': this.coffeeShop$, 'pages': this.pages};
  }

  async getFeedBack(page?: number): Promise<any> {
    await this.fetchAPI.get(`location/coffeeshops/?page=${page}/feedbacks/`).then((res) => {
      this.pagination = res.data;
      this.feedBack$ = this.pagination.results;
      this.pages = Math.ceil(this.pagination.count / 10);
    });
    // return this.feedBack$;
    return {'feedBacks': this.feedBack$, 'pages': this.pages};
  }

  async getFeedBackByIDCoffee(idCoffee: number): Promise<any> {
    await this.fetchAPI.get(`location/coffeeshops/${idCoffee}/feedbacks/`).then((res) => {
      this.pagination = res.data;
      this.feedBack$ = this.pagination.results;
      this.pages = Math.ceil(this.pagination.count / 10);
    });
    // return this.feedBack$;
    return {'feedBacks': this.feedBack$, 'pages': this.pages};
  }
}
