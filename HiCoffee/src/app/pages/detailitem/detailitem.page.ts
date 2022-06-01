import { LocalStoreService } from 'src/app/services/localstore.service';
/* eslint-disable @typescript-eslint/dot-notation */
import { FavoriteOrCheckInService } from '../../services/favorite-or-check-in/favorite-or-check-in.service';
import { FavoriteOrCheckIn } from './../../interfaces/favorite-or-check-in';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Gesture, GestureConfig, GestureController } from '@ionic/angular';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';
import { ImageCoffeeShop } from 'src/app/interfaces/image-coffee-shop';
import { FeedBack } from 'src/app/interfaces/feed-back';
import { CoffeeShopService } from './../../services/coffee-shop/coffee-shop.service';
import LoadingUtils from 'src/app/utils/loading.utils';
import { Category } from 'src/app/interfaces/category';
import ToastUtils from 'src/app/utils/toast.utils';

@Component({
  selector: 'app-detailitem',
  templateUrl: './detailitem.page.html',
  styleUrls: ['./detailitem.page.scss'],
})
export class DetailitemPage implements OnInit {

  @ViewChild('contenttouch', { read: ElementRef }) contenttouch: ElementRef;
  @ViewChild('bartouch', { read: ElementRef }) bartouch: ElementRef;
  @ViewChild('iconFavorite', { read: ElementRef }) favoriteIcon: ElementRef;


  width: number = window.innerWidth;
  height: number = window.innerHeight;
  minimumSize: number;
  maximumSize: number;
  isFavorite: boolean;
  isClickedFeedback: boolean;
  isShowMore: boolean;
  moreTextDes: string;

  coffeeShop: CoffeeShop;
  imageCoffeeShop$: ImageCoffeeShop[];
  feedBack$: FeedBack[] = [];
  category$: any[] = [];
  categoryStr: string;  

  imageSlideOpts = {
    slidesPerView: 1,
    centeredSlides: true,
    autoplay: true,
  };

  constructor(
    private gestureCtrl: GestureController,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private markService: FavoriteOrCheckInService,
    private fetchAPI: CoffeeShopService,
    private loadingUtils: LoadingUtils,
    private router: Router,
    private storeService: LocalStoreService,
  ) {
    this.coffeeShop = JSON.parse(this.route.snapshot.paramMap.get('itemObj'));
    this.category$ = this.coffeeShop.types_cfs;
    this.categoryStr = this.convertCategoryArrToString();
    this.imageCoffeeShop$ = this.coffeeShop.imgs_cfs;
    this.minimumSize = this.height - 100;
    this.maximumSize = (0.25 * this.height) - 50;
    this.isClickedFeedback = false; 
    this.isShowMore = false;
    this.moreTextDes = 'Xem thêm';
  }

  async ngOnInit() {
    this.isFavorite = await this.storeService.isFavorite(this.coffeeShop.id);
    if(this.isFavorite){
      this.favoriteIcon.nativeElement.setAttribute('name', 'heart');
    }
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  async ngAfterViewInit() {
    const options: GestureConfig = {
      el: this.bartouch.nativeElement,
      gestureName: 'slide-drawer-swipe',
      direction: 'y',
      onStart: () => {
        this.renderer.setStyle(this.contenttouch.nativeElement, 'transition', 'linear 0.2s');
      },
      onMove: ev => {
        this.renderer.setStyle(this.contenttouch.nativeElement, 'height', `${((this.height - ev.currentY + 60) / this.height) * 100}%`);
        if (ev.currentY < this.minimumSize) {
          this.renderer.setStyle(this.contenttouch.nativeElement, 'background', 'var(--ion-color-coffee-gray-1)');
        }
      },
      onEnd: ev => {
        // this.renderer.setStyle(this.contenttouch.nativeElement, 'height', '75%');
        if (ev.currentY > this.minimumSize) {
          this.renderer.setStyle(this.contenttouch.nativeElement, 'height', '40px');
          this.renderer.setStyle(this.contenttouch.nativeElement, 'background', 'transparent');
        }
        if (ev.currentY > this.maximumSize && ev.currentY < this.minimumSize) {
          this.renderer.setStyle(this.contenttouch.nativeElement, 'height', '75%');
        }
        if (ev.currentY > 10 && ev.currentY < this.maximumSize) {
          this.renderer.setStyle(this.contenttouch.nativeElement, 'height', '95%');
        }
        if (ev.currentY < 10) {
          this.renderer.setStyle(this.contenttouch.nativeElement, 'height', '95%');
        }
      }
    };

    const gesture: Gesture = await this.gestureCtrl.create(options);
    gesture.enable();
  }

  favoriteClicked() {
    if (this.isFavorite) {
      this.isFavorite = false;
      this.favoriteIcon.nativeElement.setAttribute('name', 'heart-outline');
      // this.markService.unCheck(this.coffeeShop.id, 2);
    } else {
      this.isFavorite = true;
      this.favoriteIcon.nativeElement.setAttribute('name', 'heart');
      // this.markService.check(this.coffeeShop.id, 2);
    }
  }

  showFeedBack() {
    this.loadingUtils.presentLoading('Vui lòng chờ...');
    this.fetchAPI.getFeedBackByIDCoffee(this.coffeeShop.id).then(res => {
      // console.log(res['feedBacks']);
      this.feedBack$ = res['feedBacks'];
      this.isClickedFeedback = true;
      this.loadingUtils.dismiss();
    });
  }

  gotoWritingFeedback() {
    const coffeeString = JSON.stringify(this.coffeeShop);
    this.router.navigate(['write-feedback', coffeeString]);
  }

  convertCategoryArrToString(): string {
    let str = '';
    this.category$.forEach(cat => {
      str += `${cat.category.type}, `;
    })
    return str.substring(0, str.length-2);
  }

  showMoreDes() {
    if (this.isShowMore) {
      this.isShowMore = false;
      this.moreTextDes = 'Xem thêm'
    } else {
      this.isShowMore = true;
      this.moreTextDes = 'Rút gọn'
    }
  }
}
