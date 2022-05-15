import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';

@Component({
  selector: 'app-test-feature',
  templateUrl: './test-feature.page.html',
  styleUrls: ['./test-feature.page.scss'],
})
export class TestFeaturePage implements OnInit {
  // @ViewChild('map', { static: true }) mapElement: ElementRef;
  @ViewChild('map') mapView: ElementRef;
  map: any;
  win: any = window;

  constructor() {
    // this.Test();
  }

  ngOnInit() {
    // this.ionViewDidEnter();
  }

  // @ViewChild('map') mapView: ElementRef;

  async ionViewDidEnter() {
    // console.log('test');
    await CapacitorGoogleMaps.initialize({
      key: 'AIzaSyBApzraouEpsmwWIcqnOSt5FPurNJb4C6s',
    });

    const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;

    CapacitorGoogleMaps.create({
      width: Math.round(boundingRect.width),
      height: Math.round(boundingRect.height),
      x: Math.round(boundingRect.x),
      y: Math.round(boundingRect.y),
      latitude: -33.86,
      longitude: 151.20,
      zoom: 12
    });

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    CapacitorGoogleMaps.addListener('onMapReady', async function() {
    /*
      We can do all the magic here when map is ready
    */

      CapacitorGoogleMaps.addMarker({
        latitude: -33.86,
        longitude: 151.20,
        title: 'Custom Title',
        snippet: 'Custom Snippet',
      });

      CapacitorGoogleMaps.setMapType({
        type: 'normal'
      });
    });
  }

  ionViewDidLeave() {
    CapacitorGoogleMaps.close();
  }
}
