import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoundPageRoutingModule } from './bound-routing.module';

import { BoundPage } from './bound.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoundPageRoutingModule
  ],
  declarations: [BoundPage]
})
export class BoundPageModule {}
