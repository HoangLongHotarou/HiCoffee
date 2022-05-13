import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
declare let google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  // @ViewChild('map') mapView: ElementRef;
  // map: any;
  // mapElement: any;

  // constructor() {
  //   // CapacitorGoogleMaps.initialize({ key: environment.mapsKey });
  //   // this.getCurrentLocation().then(pos => {
  //   //   this.showMap(pos.coords.latitude, pos.coords.longitude);
  //   // });
  // }

  // ngOnInit() {
  //   // this.createMap();
  //   // CapacitorGoogleMaps.initialize({ key: environment.mapsKey });
  //   this.getCurrentLocation().then(pos => {
  //     this.showMap(pos.coords.latitude, pos.coords.longitude);
  //   });
  // }

  // ionViewDidEnter() {
  //   this.createMap();
  // }

  // createMap() {
  //   const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;
  //   CapacitorGoogleMaps.create({
  //     width: Math.round(boundingRect.width),
  //     height: Math.round(boundingRect.height),
  //     x: Math.round(boundingRect.x),
  //     y: Math.round(boundingRect.y),
  //     // latitude?: Number;
  //     zoom: 5,
  //   });
  // }

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
