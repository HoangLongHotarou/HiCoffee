import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoUpdatePageRoutingModule } from './info-update-routing.module';

import { InfoUpdatePage } from './info-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoUpdatePageRoutingModule
  ],
  declarations: [InfoUpdatePage]
})
export class InfoUpdatePageModule {}
