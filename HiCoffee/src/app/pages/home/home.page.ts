import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Category } from 'src/app/interfaces/category';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';
import { Pagination } from 'src/app/interfaces/pagination';
import { FetchAPIService } from 'src/app/services/fetch-api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loading: any;
  pagination: Pagination;
  coffeeShop$: CoffeeShop[] = [];

  constructor(private fetchAPI: FetchAPIService, public loadingController: LoadingController ) { }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  cafeSlideOpts = {
    slidesPerView: 1.5,
    centeredSlides: true,
  };

  ngOnInit() {
    this.presentLoading();
    this.fetchAPI.findAll('location/coffeeshops/?page=2').then((res) => {
      this.pagination = res.data;
      console.log(this.pagination);
      this.coffeeShop$ = this.pagination.results;
      console.log(this.coffeeShop$);
      this.loading.dismiss();
    });

  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'loading-style',
      message: 'Đang lấy dữ liệu từ API\nVui lòng chờ',
    });
    return this.loading.present();
  }
}
