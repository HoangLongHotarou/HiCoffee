import { FavoriteOrCheckInService } from './../../services/favorite-or-check-in/favorite-or-check-in.service';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';
import { Pagination } from './../../interfaces/pagination';
import { Component, OnInit } from '@angular/core';
import { FetchAPIService } from 'src/app/services/fetch-api.service';
import { FavoriteOrCheckIn } from 'src/app/interfaces/favorite-or-check-in';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.page.html',
  styleUrls: ['./checkin.page.scss'],
})
export class CheckinPage implements OnInit {
  pagination: Pagination;
  checkIn$: FavoriteOrCheckIn[] = [];

  constructor(private fetch: FavoriteOrCheckInService) {
  }

  async ngOnInit() {
    await this.fetch.getAll(1).then(res=>{
      this.checkIn$ = res;
    });
  }
}
