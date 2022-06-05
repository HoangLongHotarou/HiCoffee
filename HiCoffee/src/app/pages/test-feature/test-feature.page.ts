import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { ActivatedRoute } from '@angular/router';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';

@Component({
  selector: 'app-test-feature',
  templateUrl: './test-feature.page.html',
  styleUrls: ['./test-feature.page.scss'],
})
export class TestFeaturePage implements OnInit {

  listHour: string[]=[];
  value: string;
  listMinute: string[]=[];

  hourOpen: string;
  minuteOpen: string;
  hourClose: string;
  minuteClose: string;

  constructor(private route: ActivatedRoute) {
    // const cafeRec = this.route.snapshot.paramMap.get('cafeObj');
    // this.cafe = JSON.parse(cafeRec);
    // this.Test();
  }

  ngOnInit() {
    for(let i=0;i<=24;i++){
      this.value = i.toString();
      if(i<10){
        this.value = '0'+i.toString();
      }
      this.listHour.push(this.value);
    }
    for(let i=0;i<=60;i++){
      this.value = i.toString();
      if(i<10){
        this.value = '0'+i.toString();
      }
      this.listMinute.push(this.value);
    }
  }

  getHourOpen(hourOpen){
    console.log(hourOpen);
  }

  onClickTest(){
    console.log(this.hourOpen+':'+this.minuteOpen+':00');
    console.log(this.hourClose+':'+this.minuteClose+':00');
  }
}
