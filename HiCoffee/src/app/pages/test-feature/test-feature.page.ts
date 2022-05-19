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

  cafe : CoffeeShop;

  constructor(private route : ActivatedRoute) {
    let cafeRec = this.route.snapshot.paramMap.get('cafeObj');
    this.cafe = JSON.parse(cafeRec);
    // this.Test();
  }

  ngOnInit() {
    // this.ionViewDidEnter();
    console.log(this.cafe)
  }

}
