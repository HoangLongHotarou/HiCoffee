import { InformationService } from './../../services/information/information.service';
import { CoffeeShopService } from './../../services/coffee-shop/coffee-shop.service';
import { Component, OnInit } from '@angular/core';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';
import { Pagination } from 'src/app/interfaces/pagination';
import LoadingUtils from 'src/app/utils/loading.utils';
import { Information } from 'src/app/interfaces/infomation';
import { LocalStoreService } from 'src/app/services/localstore.service';
import InformErrorUtils from 'src/app/utils/inform-error.utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pagination: Pagination;
  coffeeShopForUser$: CoffeeShop[] = [];
  coffeeShopBestFavorite$: CoffeeShop[] = [];

  info: Information;
  username: string;

  constructor(
    private fetchCoffeeShop: CoffeeShopService,
    private loadingUtils: LoadingUtils,
    private localstore: LocalStoreService) {
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  cafeSlideOpts = {
    slidesPerView: 1.5,
    centeredSlides: true,
  };

  async ngOnInit() {
    await this.loadingUtils.presentLoading('Đang lấy dữ liệu từ API</br>Vui lòng chờ');
    const ids = await this.localstore.getHobbies();
    await this.fetchCoffeeShop.getAll(1, true, ids).then((res) => {
      this.coffeeShopForUser$ = res.coffeeShops;
    });

    await this.fetchCoffeeShop.getAll(1, true).then((res) => {
      this.coffeeShopBestFavorite$ = res.coffeeShops;
    });

    this.info = await this.localstore.loadInfo('info');
    if (this.info === undefined || this.info === null) {
      this.username = 'khách';
    } else {
      this.username = this.info.user.username;
    }
    this.loadingUtils.dismiss();
  }
}
