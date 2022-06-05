import { CoffeeShopService } from './../../services/coffee-shop/coffee-shop.service';
import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Category } from 'src/app/interfaces/category';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';
import { Pagination } from 'src/app/interfaces/pagination';
import  LoadingUtils  from 'src/app/utils/loading.utils';
import { FetchAPIService } from 'src/app/services/fetch-api.service';
import { Information } from 'src/app/interfaces/infomation';
import { LocalStoreService } from 'src/app/services/localstore.service';
import InformErrorUtils from 'src/app/utils/inform-error.utils';
import { ObjectUnsubscribedError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pagination: Pagination;
  coffeeShop$: CoffeeShop[] = [];

  info: Information;
  username: string;

  constructor(
    private fetchCoffeeShop: CoffeeShopService,
    private loadingUtils: LoadingUtils,
    private errorUtils: InformErrorUtils,
    private localstore: LocalStoreService) {
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  cafeSlideOpts = {
    slidesPerView: 1.5,
    centeredSlides: true,
  };

  async ngOnInit() {
    await this.loadingUtils.presentLoading('Đang lấy dữ liệu từ API</br>Vui lòng chờ');
    await this.fetchCoffeeShop.getAll(2).then((res) => {
      this.coffeeShop$ = res.coffeeShops;
    });
    this.info = await this.localstore.loadInfo('info');
    if(this.info == undefined){
      this.username = 'khách';
    }else{
      this.username = this.info.user.username;
    }
    this.loadingUtils.dismiss();
  }
}
