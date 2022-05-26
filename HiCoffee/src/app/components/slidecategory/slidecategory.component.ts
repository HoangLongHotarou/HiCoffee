import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

  width: number = window.innerWidth;
  slidePerView: number = 1;
  cafeSlideOpts: any;

  constructor(private fetchAPI: FetchAPIService,private router: Router) {
    this.slidePerView = (this.width >= 768) ? 3 : 2; 
    this.cafeSlideOpts = {
      slidesPerView: this.slidePerView,
      centeredSlides: true,
      autoplay: true,
      loop: true,
      spaceBetween: 20
    };  
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering  

  ngOnInit() {
    // this.fetchAPI.findAll('location/coffeeshops/?page=2').then((res) => {
    //   this.coffeeShop$ = res.data.results;
    //   console.log(this.coffeeShop$);
    // });

    // console.log('Text '+this.coffee)
  }

  gotoDetailPage(cafe) {
    const cafeString = JSON.stringify(cafe);
    this.router.navigate(['/detailitem',cafeString]);
  }
}
