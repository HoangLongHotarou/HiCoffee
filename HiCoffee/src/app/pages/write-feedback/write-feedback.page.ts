import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';
import { Information } from 'src/app/interfaces/infomation';
import { LocalStoreService } from 'src/app/services/localstore.service';

@Component({
  selector: 'app-write-feedback',
  templateUrl: './write-feedback.page.html',
  styleUrls: ['./write-feedback.page.scss'],
})
export class WriteFeedbackPage implements OnInit {

  coffeeShop: CoffeeShop;
  currentRate: number;

  info: Information;
  user: any;
  userName: string;

  constructor(
    private route: ActivatedRoute,
    private localstore: LocalStoreService,
  ) { 
    this.coffeeShop = JSON.parse(this.route.snapshot.paramMap.get('coffeeShop'));
    this.currentRate = 1;  
    console.log(this.coffeeShop);    
  }

  async ngOnInit() {
    this.info = await this.localstore.loadInfo('info');
    this.user = this.info.user; 
    this.userName = this.user.username;      
  }

  onRatingChange(rating){
    console.log('The evaluation was modified and now its value is: ',rating);   
  }

  postFeedBack() {
    
  }
}
