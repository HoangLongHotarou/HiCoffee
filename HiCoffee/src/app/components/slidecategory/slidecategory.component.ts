import { Component, Input, OnInit } from '@angular/core';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';
import { FetchAPIService } from 'src/app/services/fetch-api.service';

@Component({
  selector: 'app-slidecategory',
  templateUrl: './slidecategory.component.html',
  styleUrls: ['./slidecategory.component.scss'],
})
export class SlidecategoryComponent implements OnInit {

  @Input() title: string;
  @Input() moretext: string;
  @Input() coffee: Array<CoffeeShop>;

  //coffeeShop$: CoffeeShop[] = [];

  constructor(private fetchAPI: FetchAPIService) { }

  cafeSlideOpts = {
    freeMode : true,
    slidesPerView: 2,
    slidesOffsetBefore: 11,
    spaceBetween: 10
  };

  ngOnInit() {
    // this.fetchAPI.findAll('location/coffeeshops/?page=2').then((res) => {
    //   this.coffeeShop$ = res.data.results;
    //   console.log(this.coffeeShop$);
    // });

    // console.log('Text '+this.coffee)
  }
}
