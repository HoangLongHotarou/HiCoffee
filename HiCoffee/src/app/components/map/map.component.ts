import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
declare let google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @ViewChild('map', { static: true }) mapElement: ElementRef;
  @Input() latitude: any;
  @Input() longitude: any;
  @Input() nameCoffeeShop: any;

  map: any;

  constructor() {
  }

  ngOnInit() {
    console.log(this.latitude);
    console.log(this.longitude);
    console.log(this.nameCoffeeShop);
    this.getCurrentLocation().then(pos => {
      this.showMap(pos.coords.latitude, pos.coords.longitude);
    });
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
        // icon:'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png'
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
