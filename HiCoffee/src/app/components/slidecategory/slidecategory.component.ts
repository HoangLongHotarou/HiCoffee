import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';
import { FetchAPIService } from 'src/app/services/fetch-api.service';

@Component({
  selector: 'app-slidecategory',
  templateUrl: './slidecategory.component.html',
  styleUrls: ['./slidecategory.component.scss'],
})
export class SlidecategoryComponent implements OnInit {

  @Input() routerlink: string;
  @Input() title: string;
  @Input() moretext: string;
  @Input() coffee: Array<CoffeeShop>;

  //coffeeShop$: CoffeeShop[] = [];

  constructor(private fetchAPI: FetchAPIService,private router:Router) { }

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

  gotoDetailPage(cafe) {
    let cafeString = JSON.stringify(cafe);
    this.router.navigate(['/test-feature',cafeString]);
  }
}
