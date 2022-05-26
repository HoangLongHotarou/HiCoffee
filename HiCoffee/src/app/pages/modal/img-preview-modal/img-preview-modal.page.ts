import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-img-preview-modal',
  templateUrl: './img-preview-modal.page.html',
  styleUrls: ['./img-preview-modal.page.scss'],
})
export class ImgPreviewModalPage implements OnInit {

  @Input() index: number;
  @Input() imgArr: string[];

  slideOtps: any;
  isSlideChanged: boolean;

  constructor(
    private modalCtrl: ModalController
  ) {
    this.isSlideChanged = false;
  }

  ngOnInit() {
    this.slideOtps = {
      slidePerView: 1,
      initialSlide: this.index,
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
