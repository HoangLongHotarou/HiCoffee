import { CoffeeShopService } from './../../services/coffee-shop/coffee-shop.service';
import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Category } from 'src/app/interfaces/category';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';
import { Pagination } from 'src/app/interfaces/pagination';
import { FetchAPIService } from 'src/app/services/fetch-api.service';
import AlertUtils from 'src/app/utils/alert.utils';
import  LoadingUtils  from 'src/app/utils/loading.utils';
import ToastUtils from 'src/app/utils/toast.utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pagination: Pagination;
  coffeeShop$: CoffeeShop[] = [];

  constructor(private fetchCoffeeShop: CoffeeShopService, private loadingUtils: LoadingUtils) {
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  cafeSlideOpts = {
    slidesPerView: 1.5,
    centeredSlides: true,
  };

  ngOnInit() {
    this.loadingUtils.presentLoading('Đang lấy dữ liệu từ API</br>Vui lòng chờ');
    this.fetchCoffeeShop.getAll(2).then((res) => {
      // this.pagination = res;
      // console.log(this.pagination);
      this.coffeeShop$ = res.coffeeShops;
      console.log(this.coffeeShop$);
      this.loadingUtils.dismiss();
    });
    // this.fetchAPI.get('location/coffeeshops/?page=2').then((res) => {
    // });
  }

  Alert() {
    // this.alertUtils.presentAlert('Thông báo', 'Nội dung');
    this.alertUtils.presentAlertConfirm('Bạn có đồng ý?',
    {
      OK: () => {
        console.log('Hello OK');
      },
      Cancel: () => {
        console.log('Hello Cancel'); ;
      }
    });
  }

  Toast() {
    this.toastUtils.presentToastError('Nội dung', 'middle');
  }
}
