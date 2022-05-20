import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';
import { FetchAPIService } from 'src/app/services/fetch-api.service';
import { Pagination } from 'src/app/interfaces/pagination';
import { Router } from '@angular/router';
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

  isShowSearchBar: boolean = false;

  @ViewChild('container', {read: ElementRef}) container: ElementRef;

  constructor(
    private fetchAPI: FetchAPIService, 
    public loadingUtils: LoadingUtils, 
    private router: Router
    ) {
    this.title = 'Title Default';
  }

  ngOnInit() {
    this.loadingUtils.presentLoading('Vui lòng chờ');
    this.getList();
  }

  getList(event?): void {
    this.fetchAPI.findAll(`location/coffeeshops/?page=${this.page}`).then((res) => {
      this.pagination = res.data;
      this.maximumpage = Math.ceil(this.pagination.count / 10);
      this.coffeeShop$ = this.coffeeShop$.concat(this.pagination.results);
      console.log(this.coffeeShop$);
      this.loadingUtils.dismiss();
      console.log('1:', this.coffeeShop$.length);
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
    let coffeeString = JSON.stringify(coffeeShop)    
    this.router.navigate(['detailitem', coffeeString]);
  }

  onTextChanged(textSearchEvt: string) {
    // console.log(textSearchEvt);
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
