import { CheckIn } from 'src/app/interfaces/check-in';
import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';
declare let google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnChanges, OnInit {

  @ViewChild('map', { static: true }) mapElement: ElementRef;
  @Input() coffeeShop: CoffeeShop;
  @Input() coffeeShop$: Array<CoffeeShop>;
  @Input() checkIn$: CheckIn[];
  @Input() height: string;

  map: any;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(this.mapElement.nativeElement, 'height', this.height);
  }

  ngOnChanges() {
    console.log('test', this.checkIn$);
    this.coffeeShopsMapCheckIn(this.checkIn$);
  }

  coffeeShopsMapCheckIn(checkIn$: Array<CheckIn>) {
    let sumLat = 0;
    let sumLon = 0;
    const a = -47.273;
    const b = 14.327;
    let defaultZoom = 0;
    checkIn$.forEach((checkIn) => {
      sumLat += parseFloat(checkIn.coffee_shop.latitude);
      sumLon += parseFloat(checkIn.coffee_shop.longitude);
    });
    const meanLat = sumLat / checkIn$.length;
    const meanLon = sumLon / checkIn$.length;
    let maxSize = -1;
    checkIn$.forEach((checkIn) => {
      const lat = parseFloat(checkIn.coffee_shop.latitude) - meanLat;
      const lon = parseFloat(checkIn.coffee_shop.longitude) - meanLon;
      const pathSize = Math.sqrt(lat * lat + lon * lon);
      if (pathSize > maxSize) {
        maxSize = pathSize;
      }
    });
    defaultZoom = a * maxSize + b;
    const latLng = new google.maps.LatLng(meanLat, meanLon);
    const mapOptions = {
      center: latLng,
      zoom: defaultZoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      icon: 'Test',
      snippet: 'test'
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    checkIn$.forEach((checkIn) => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(checkIn.coffee_shop.latitude, checkIn.coffee_shop.longitude),
        map: this.map,
        animation: google.maps.Animation.BOUNCE,
      });
    });
  }

  coffeeShopsMapCurrentUser(checkIn$: Array<CheckIn>, latitude: any, longitude: any) {
    const latLng = new google.maps.LatLng(latitude, longitude);
    const mapOptions = {
      center: latLng,
      zoom: 35,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      icon: 'Test',
      snippet: 'test'
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    checkIn$.forEach((checkIn) => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(checkIn.coffee_shop.latitude, checkIn.coffee_shop.longitude),
        map: this.map,
        animation: google.maps.Animation.BOUNCE,
        label: { color: '#00aaff', fontWeight: 'bold', fontSize: '14px', text: `${checkIn.coffee_shop.name}` },
        optimized: false,
        visible: true
      });
    });
  }

  showLocation(coffeeShop: CoffeeShop) {
    const latLng = new google.maps.LatLng(coffeeShop.latitude, coffeeShop.longitude);
    const mapOptions = {
      center: latLng,
      zoom: 100,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    const marker = new google.maps.Marker(
      {
        position: latLng,
        animation: google.maps.Animation.BOUNCE,
      });
    const infowindow = new google.maps.InfoWindow({
      content: coffeeShop.name
    });
    marker.setMap(this.map);
    infowindow.open(this.map, marker);
  }

  showMap(latitude: any, longitude: any) {
    const latLng = new google.maps.LatLng(latitude, longitude);
    const mapOptions = {
      center: latLng,
      zoom: 100,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      icon: 'Test',
      snippet: 'test'
    };
    const marker = new google.maps.Marker(
      {
        position: latLng,
        animation: google.maps.Animation.BOUNCE,
        icon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png'
      });
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    const infowindow = new google.maps.InfoWindow({
      content: 'Hello World!'
    });
    marker.setMap(this.map);
    infowindow.open(this.map, marker);
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
