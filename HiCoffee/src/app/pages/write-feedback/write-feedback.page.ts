import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';

@Component({
  selector: 'app-write-feedback',
  templateUrl: './write-feedback.page.html',
  styleUrls: ['./write-feedback.page.scss'],
})
export class WriteFeedbackPage implements OnInit {

  coffeeShop: CoffeeShop;
  currentRate: number;

  constructor(
    private route: ActivatedRoute,
  ) { 
    this.coffeeShop = JSON.parse(this.route.snapshot.paramMap.get('coffeeShop'));
    this.currentRate = 1;  
    console.log(this.coffeeShop);    
  }

  ngOnInit() {
  }

  onRatingChange(rating){
    console.log('The evaluation was modified and now its value is: ',rating);   
  }
}
