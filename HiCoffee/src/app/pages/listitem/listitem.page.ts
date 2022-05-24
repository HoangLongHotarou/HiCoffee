import { CoffeeShopService } from './../../services/coffee-shop/coffee-shop.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';
import { FetchAPIService } from 'src/app/services/fetch-api.service';
import { Pagination } from 'src/app/interfaces/pagination';
import { ActivatedRoute, Router } from '@angular/router';
import LoadingUtils from 'src/app/utils/loading.utils';

@Component({
  selector: 'app-listitem',
  templateUrl: './listitem.page.html',
  styleUrls: ['./listitem.page.scss'],
})
export class ListitemPage implements OnInit {

  page = 1;
  maximumpage;
  count: any;
  title: string;
  pagination: Pagination;
  coffeeShop$: CoffeeShop[] = [];
  textSearch: string;
  idList: number;

  isShowSearchBar = false;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('container', { read: ElementRef }) container: ElementRef;

  constructor(
    private fetchCoffeeShop: CoffeeShopService,
    public loadingUtils: LoadingUtils,
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this.idList = Number.parseInt(this.route.snapshot.paramMap.get('idList'));
    this.loadingUtils.presentLoading('Vui lòng chờ');
    this.getList();
  }

  getList(event?) {
    switch(this.idList) {
      case 1:      
        this.title = 'Dành cho bạn'
        this.getListCoffeeForYou(event);
        break;
      case 2:
        this.title = 'Dịch vụ cho bạn'
        this.getListCoffeeForYou(event);
        break;
      case 3:
        this.title = 'Địa điểm được yêu thích'
        this.getListCoffeeForYou(event);
        break; 
    }
  }

  getListCoffeeForYou(event?) {
    this.fetchCoffeeShop.getAll(this.page).then((res) => {
      this.maximumpage = res.pages;
      this.coffeeShop$ = this.coffeeShop$.concat(res.coffeeShops);
      this.loadingUtils.dismiss();
      if (event) {
        event.target.complete();
      }
    });
  }

  loadMore(event) {
    this.page++;
    this.getList(event);
    // console.log('2:', this.coffeeShop$.length);
    if (this.page === this.maximumpage) {
      event.target.disabled = true;
    }
  }

  goToDetailPage(coffeeShop) {
    const coffeeString = JSON.stringify(coffeeShop);
    this.router.navigate(['detailitem', coffeeString]);
  }

  onTextChanged(textSearchEvt: string) {
    this.textSearch = textSearchEvt;
  }

  showSearchBar() {
    this.isShowSearchBar = this.isShowSearchBar ? false : true;
  }

  doRefresh(event) {
    this.page = 1;
    this.coffeeShop$ = [];
    this.isShowSearchBar = false;
    this.getList(event);
  }
}
