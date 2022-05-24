import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WriteFeedbackPageRoutingModule } from './write-feedback-routing.module';

import { WriteFeedbackPage } from './write-feedback.page';
import { IonicRatingComponentModule } from 'ionic-rating-component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WriteFeedbackPageRoutingModule,
    IonicRatingComponentModule,
  ],
  declarations: [WriteFeedbackPage]
})
export class WriteFeedbackPageModule {}
