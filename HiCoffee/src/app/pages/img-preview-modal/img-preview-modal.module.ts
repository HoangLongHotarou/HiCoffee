import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImgPreviewModalPageRoutingModule } from './img-preview-modal-routing.module';

import { ImgPreviewModalPage } from './img-preview-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImgPreviewModalPageRoutingModule
  ],
  declarations: [ImgPreviewModalPage]
})
export class ImgPreviewModalPageModule {}
