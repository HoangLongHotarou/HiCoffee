import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Category } from 'src/app/interfaces/category';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';
import { Pagination } from 'src/app/interfaces/pagination';
import { FetchAPIService } from 'src/app/services/fetch-api.service';
import  LoadingUtils  from 'src/app/utils/loading.utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pagination: Pagination;
  coffeeShop$: CoffeeShop[] = [];

  constructor(private fetchAPI: FetchAPIService, private loadingUtils: LoadingUtils ) {
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  cafeSlideOpts = {
    slidesPerView: 1.5,
    centeredSlides: true,
  };

  ngOnInit() {
    this.loadingUtils.presentLoading('Đang lấy dữ liệu từ API</br>Vui lòng chờ');
    this.fetchAPI.get('location/coffeeshops/?page=2').then((res) => {
      this.pagination = res.data;
      console.log(this.pagination);
      this.coffeeShop$ = this.pagination.results;
      console.log(this.coffeeShop$);
      this.loadingUtils.dismiss();
    });
  }
}
