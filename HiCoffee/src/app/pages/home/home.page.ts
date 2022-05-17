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
  coffeeShop: string;
  category: string;
  img: string;
  pagination: Pagination;
  coffeeShop$: CoffeeShop[] = [];
  category$: Category[] = [];
  imageUrl: SafeResourceUrl;

  constructor(private fetchAPI: FetchAPIService, public loadingController: LoadingController ) { }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  cafeSlideOpts = {
    slidesPerView: 1.5,
    centeredSlides: true,
  };

  ngOnInit() {
    this.fetchAPI.findAll('location/coffeeshops/?page=2').then((res) => {
      this.pagination = res.data;
      console.log(this.pagination);
      this.coffeeShop$ = this.pagination.results;
      console.log(this.coffeeShop$);
      this.coffeeShop = this.coffeeShop$[0].name;
      this.img = this.coffeeShop$[0].image_represent;
      this.imageUrl = this.img;
      console.log(this.img);
    });

    this.fetchAPI.findAll('location/categories/').then((res) => {
      this.category$ = res.data;
      console.log(this.category$);
      // this.category = this.category$[0].type;
    });

    this.fetchAPI.find('location/coffeeshops/', 1).then((res) => {
      this.coffeeShop = res.data;
      console.log(this.coffeeShop);
    });

    this.fetchAPI.find('location/categories/', 2).then((res) => {
      this.category = res.data;
      console.log(this.category);
      // this.loading.dismiss();
    });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'loading-style',
      message: 'Vui lòng chờ',
    });
    return this.loading.present();
  }
}
