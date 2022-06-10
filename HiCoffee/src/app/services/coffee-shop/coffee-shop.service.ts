import InformErrorUtils from 'src/app/utils/inform-error.utils';
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
  result: any;

  constructor(
    private fetchAPI: FetchAPIService,
    private errorUtils: InformErrorUtils
  ) { }

  async getAll(page?: number): Promise<any> {
    await this.fetchAPI.get(`location/coffeeshops/?page=${page}`).then((res) => {
      this.pagination = res.data;
      this.coffeeShop$ = this.pagination.results;
      this.pages = Math.ceil(this.pagination.count / 10);
    }).catch((error) => {
      this.errorUtils.catchError(error.response.status);
    });
    return { 'coffeeShops': this.coffeeShop$, 'pages': this.pages };
  }

  async getCoffeebyUser(): Promise<any> {
    await this.fetchAPI.get('customer/cfsowner/', true).then((res) => {
      this.pagination = res.data;
      this.coffeeShop$ = this.pagination.results;
    });
    return { 'coffeeShops': this.coffeeShop$ };
  }

  async getFilter(page?: number, listFilter?: any): Promise<any> {
    await this.fetchAPI.get(`location/coffeeshops/?id_categories=${listFilter}&page=${page}`).then((res) => {
      this.pagination = res.data;
      this.coffeeShop$ = this.pagination.results;
      this.pages = Math.ceil(this.pagination.count / 10);
    }).catch((error) => {
      this.errorUtils.catchError(error.response.status);
    });
    return { 'coffeeShops': this.coffeeShop$, 'pages': this.pages };
  }

  async getFeedBack(page?: number): Promise<any> {
    await this.fetchAPI.get(`location/coffeeshops/?page=${page}/feedbacks/`).then((res) => {
      this.pagination = res.data;
      this.feedBack$ = this.pagination.results;
      this.pages = Math.ceil(this.pagination.count / 10);
    }).catch((error) => {
      this.errorUtils.catchError(error.response.status);
    });
    return { 'feedBacks': this.feedBack$, 'pages': this.pages };
  }

  async getFeedBackByIDCoffee(idCoffee: number): Promise<any> {
    await this.fetchAPI.get(`location/coffeeshops/${idCoffee}/feedbacks/`).then((res) => {
      this.pagination = res.data;
      this.feedBack$ = this.pagination.results;
      this.pages = Math.ceil(this.pagination.count / 10);
    }).catch((error) => {
      this.errorUtils.catchError(error.response.status);
    });
    return { 'feedBacks': this.feedBack$, 'pages': this.pages };
  }

  async postFeedBackByIDCoffee(idCoffee: number, feedBackData: any): Promise<any> {
    await this.fetchAPI.post(`location/coffeeshops/${idCoffee}/feedbacks/`, feedBackData, true).then((res) => {
      this.result = res.data;
    }).catch((error) => {
      this.errorUtils.catchError(error.response.status);
    });
    return this.result;
  }

  async postImagesFeedBackByIDCoffee(idCoffee: number, idFeedBack: number, imgsFeedBackData: any): Promise<any> {
    await this.fetchAPI.postFormData(`location/coffeeshops/${idCoffee}/feedbacks/${idFeedBack}/images/`, imgsFeedBackData, true).then((res) => {
      this.result = res.data;
    }).catch((error) => {
      this.errorUtils.catchError(error.response.status);
    });
    return this.result;
  }

  async postImagesByIDCoffee(idCoffee:number,image: any): Promise<any>{
    await this.fetchAPI.postFormData(`customer/cfsowner/${idCoffee}/imagecfs/`,image,true).then((res)=>{
      this.result = res.data;
    }).catch((error)=>{
      this.errorUtils.catchError(error.response.status);
    })
    return this.result;
  }
}
