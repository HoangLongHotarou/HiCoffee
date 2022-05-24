import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-img-preview-modal',
  templateUrl: './img-preview-modal.page.html',
  styleUrls: ['./img-preview-modal.page.scss'],
})
export class ImgPreviewModalPage implements OnInit {

  @Input() imgSrc: string;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
