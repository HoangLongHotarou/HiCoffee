import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
declare let google;

@Component({
  selector: 'app-test-feature',
  templateUrl: './test-feature.page.html',
  styleUrls: ['./test-feature.page.scss'],
})
export class TestFeaturePage implements OnInit {
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  map: any;

  constructor() {
    // this.Test();
  }

  ngOnInit() {
    this.getCurrentLocation().then(pos => {
      this.showMap(pos.coords.latitude, pos.coords.longitude);
    });
  }

  showMap(latitude: any, longitude: any) {
    const latLng = new google.maps.LatLng(latitude, longitude);
    const mapOptions = {
      center: latLng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  getCurrentLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      const locOptions = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
      Geolocation.getCurrentPosition(locOptions).then((position: any) => {
        resolve(position);
      }).catch(e => {
        reject(e.message);
      });
    });
  }

}
