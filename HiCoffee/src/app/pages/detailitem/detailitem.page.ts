import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Gesture, GestureConfig, GestureController } from '@ionic/angular';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';

@Component({
  selector: 'app-detailitem',
  templateUrl: './detailitem.page.html',
  styleUrls: ['./detailitem.page.scss'],
})
export class DetailitemPage implements OnInit {

  @ViewChild('contenttouch', { read: ElementRef }) contenttouch: ElementRef;
  @ViewChild('bartouch', { read: ElementRef }) bartouch: ElementRef;

  width: number = window.innerWidth;
  height: number = window.innerHeight;
  minimumSize: number;
  maximumSize: number;

  coffeeShop: CoffeeShop;

  constructor(
    private gestureCtrl: GestureController,
    private renderer: Renderer2,
    private route: ActivatedRoute,
  ) {
    this.coffeeShop = JSON.parse(this.route.snapshot.paramMap.get('itemObj'));
    this.minimumSize = this.height - 100;
    this.maximumSize = (0.25 * this.height) - 50;
  }

  ngOnInit() {
    console.log(this.coffeeShop);
    console.log(window.innerHeight);
    console.log(window.innerWidth);
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  async ngAfterViewInit() {
    const options: GestureConfig = {
      el: this.bartouch.nativeElement,
      gestureName: 'slide-drawer-swipe',
      direction: 'y',
      onStart: () => {
        this.renderer.setStyle(this.contenttouch.nativeElement, 'transition', 'linear 0.2s');
      },
      onMove: ev => {
        this.renderer.setStyle(this.contenttouch.nativeElement, 'height', `${((this.height - ev.currentY + 60) / this.height) * 100}%`);
        if (ev.currentY < this.minimumSize) {
          this.renderer.setStyle(this.contenttouch.nativeElement, 'background', 'var(--ion-color-coffee-light)');
        }
        // console.log(ev.currentX);
        // console.log(ev.currentY);
        // console.log(ev.deltaY);
        // console.log(ev);
      },
      onEnd: ev => {
        // this.renderer.setStyle(this.contenttouch.nativeElement, 'height', '75%');
        if (ev.currentY > this.minimumSize) {
          this.renderer.setStyle(this.contenttouch.nativeElement, 'height', '40px');
          this.renderer.setStyle(this.contenttouch.nativeElement, 'background', 'transparent');
        }
        if (ev.currentY > this.maximumSize && ev.currentY < this.minimumSize) {
          this.renderer.setStyle(this.contenttouch.nativeElement, 'height', '75%');
        }
        if (ev.currentY > 10 && ev.currentY < this.maximumSize) {
          this.renderer.setStyle(this.contenttouch.nativeElement, 'height', '95%');
        }
        if (ev.currentY < 10) {
          this.renderer.setStyle(this.contenttouch.nativeElement, 'height', '95%');
        }
      }
    };

    const gesture: Gesture = await this.gestureCtrl.create(options);
    gesture.enable();

    console.log(this.contenttouch);
  }
}
