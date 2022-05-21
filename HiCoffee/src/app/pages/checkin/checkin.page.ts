import { CoffeeShop } from 'src/app/interfaces/coffeeshop';
import { Pagination } from './../../interfaces/pagination';
import { Component, OnInit } from '@angular/core';
import { FetchAPIService } from 'src/app/services/fetch-api.service';
import { CheckIn } from 'src/app/interfaces/check-in';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.page.html',
  styleUrls: ['./checkin.page.scss'],
})
export class CheckinPage implements OnInit {
  pagination: Pagination;
  checkIn$: CheckIn[] = [];

  constructor(private fetchApi: FetchAPIService) {
  }

  async ngOnInit() {
    await this.fetchApi.get('customer/checkinmarker/', true).then((result) => {
      this.pagination = result.data;
      this.checkIn$ = this.pagination.results;
      console.log(this.checkIn$);
    }).catch((err) => {
      console.log(err);
    });
  }
}
