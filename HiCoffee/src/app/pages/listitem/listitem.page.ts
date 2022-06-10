import { CoffeeShopService } from './../../services/coffee-shop/coffee-shop.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';
import { FetchAPIService } from 'src/app/services/fetch-api.service';
import { Pagination } from 'src/app/interfaces/pagination';
import { ActivatedRoute, Router } from '@angular/router';
import LoadingUtils from 'src/app/utils/loading.utils';
import { LocalStoreService } from 'src/app/services/localstore.service';
import { ModalController } from '@ionic/angular';
import { FilterListPage } from '../modal/filter-list/filter-list.page';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-listitem',
  templateUrl: './listitem.page.html',
  styleUrls: ['./listitem.page.scss'],
})
export class ListitemPage implements OnInit {

  page = 1;
  maximumpage: number;
  count: any;
  title: string;
  pagination: Pagination;
  coffeeShop$: CoffeeShop[] = [];
  category$: Category[] = [];
  textSearch: string;
  idList: number;
  check: boolean;
  listIDCategory: [] = [];
  notFound: boolean;

  isShowSearchBar = false;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('container', { read: ElementRef }) container: ElementRef;

  constructor(
    private fetchCoffeeShop: CoffeeShopService,
    private fetchCategory: CategoryService,
    public loadingUtils: LoadingUtils,
    private router: Router,
    private route: ActivatedRoute,
    private localstore: LocalStoreService, private render: Renderer2,
    private modalCtrl: ModalController,
  ) {
    this.notFound = false;
  }

  async ngOnInit() {
    // eslint-disable-next-line radix
    this.idList = Number.parseInt(this.route.snapshot.paramMap.get('idList'));
    this.loadingUtils.presentLoading('Vui lòng chờ');
    await this.getListCategory();
    this.getList();
  }

  async getListCategory() {
    this.fetchCategory.getAll().then((res) => {
      console.log(res);
      this.category$ = res;
    });
  }

  async getList(event?) {
    switch (this.idList) {
      case 1:
        this.title = 'Dành cho bạn';
        this.getListCoffeeForYou(event);
        break;
      case 2:
        this.title = 'Dịch vụ cho bạn';
        this.getListCoffeeForYou(event);
        break;
      case 3:
        this.title = 'Địa điểm được yêu thích';
        await this.getListCoffeeFavorites(event);
        break;
      case 4:
        this.title = 'Kết quả tìm kiếm';
        this.getListResult(event);
        break;
    }
  }

  getListCoffeeForYou(event?) {
    this.fetchCoffeeShop.getAll(this.page, true,).then((res) => {
      this.maximumpage = res.pages;
      this.coffeeShop$ = this.coffeeShop$.concat(res.coffeeShops);
      this.checkArrayCoffeeShop();
      this.loadingUtils.dismiss();
      if (event) {
        event.target.complete();
      }
    });
  }

  async getListCoffeeFavorites(event?) {
    const ids = await this.localstore.getHobbies();
    this.fetchCoffeeShop.getAll(this.page, true, ids).then((res) => {
      this.maximumpage = res.pages;
      this.coffeeShop$ = this.coffeeShop$.concat(res.coffeeShops);
      this.checkArrayCoffeeShop();
      this.loadingUtils.dismiss();
      if (event) {
        event.target.complete();
      }
    });
  }


  getListResult(event?) {
    this.listIDCategory = JSON.parse(this.route.snapshot.paramMap.get('filterList'));
    const listIDStr = this.listIDCategory.toString();
    this.fetchCoffeeShop.getFilter(this.page, listIDStr).then(res => {
      this.maximumpage = res.pages;
      this.coffeeShop$ = this.coffeeShop$.concat(res.coffeeShops);
      console.log(res);
      this.checkArrayCoffeeShop();
      this.loadingUtils.dismiss();
      if (event) {
        event.target.complete();
      }
    });
  }

  async loadMore(event) {
    if (this.page === this.maximumpage) {
      event.target.disabled = true;
    }
    else {
      this.page++;
      await this.getList(event);
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

  async goToFilterAction() {
    const modal = await this.modalCtrl.create({
      component: FilterListPage,
      componentProps: {
        category$: this.category$
      },
      cssClass: 'filterActionContainer'
    });
    modal.present();
  }

  checkArrayCoffeeShop() {
    this.notFound = this.coffeeShop$.length === 0 ? true : false;
  }
}
