import { Component, OnInit } from '@angular/core';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';
import { CoffeeShopService } from 'src/app/services/coffeeshop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  coffeeShop$: CoffeeShop[] = [];
  constructor(private coffeeShopService: CoffeeShopService) { }

  ngOnInit() {
    this.coffeeShopService.findAll().then((res) => {
      this.coffeeShop$ = res.data;
      console.log(this.coffeeShop$);
    });
  }

}
