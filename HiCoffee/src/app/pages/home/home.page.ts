import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';
import { FetchAPIService } from 'src/app/services/fetch-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  coffeeShop: string;
  category: string;
  img: string;
  coffeeShop$: CoffeeShop[] = [];
  category$: Category[] = [];
  constructor(private fetchAPI: FetchAPIService) { }

  ngOnInit() {
    this.fetchAPI.findAll('location/coffeeshop/').then((res) => {
      this.coffeeShop$ = res.data;
      console.log(this.coffeeShop$);
      // this.coffeeShop = this.coffeeShop$[0].name;
      this.img = this.coffeeShop$[0].image_represent;
      console.log(this.img);
    });

    this.fetchAPI.findAll('location/category/').then((res) => {
      this.category$ = res.data;
      console.log(this.category$);
      // this.category = this.category$[0].type;
    });

    this.fetchAPI.find('location/coffeeshop/', 1).then((res) => {
      this.coffeeShop = res.data;
      console.log(this.coffeeShop);
    });

    this.fetchAPI.find('location/category/', 2).then((res) => {
      this.category = res.data;
      console.log(this.category);
    });
  }

}
