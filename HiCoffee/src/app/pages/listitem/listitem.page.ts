import { Component, OnInit } from '@angular/core';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';
import { FetchAPIService } from 'src/app/services/fetch-api.service';
import { Pagination } from 'src/app/interfaces/pagination';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-listitem',
  templateUrl: './listitem.page.html',
  styleUrls: ['./listitem.page.scss'],
})
export class ListitemPage implements OnInit {

  loading: any;
  page = 1;
  maximumpage;
  count: any;
  title: string;
  pagination: Pagination;
  coffeeShop$: CoffeeShop[] = [];

  constructor(private fetchAPI: FetchAPIService, public loadingController: LoadingController ) { 
    this.title = 'Title Default';
  }

  ngOnInit() {
    this.presentLoading();
    this.getList();
  }

  getList(event?): void {
    this.fetchAPI.findAll(`location/coffeeshop/?page=${this.page}`).then((res) => {
      this.pagination = res.data;   
      this.maximumpage = Math.ceil(this.pagination.count / 10);      
      this.coffeeShop$ = this.coffeeShop$.concat(this.pagination.results);      
      console.log(this.coffeeShop$);      
      this.loading.dismiss();  
      console.log('1:', this.coffeeShop$.length);      
      if (event) {
        event.target.complete();        
      }  
    })     
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'loading-style',
      message: 'Vui lòng chờ',
    });
    return this.loading.present();
  }

  loadMore(event) {
    this.page++;
    this.getList(event);
    console.log('2:', this.coffeeShop$.length);
    if (this.page === this.maximumpage)
      event.target.disabled = true;
  }
}
