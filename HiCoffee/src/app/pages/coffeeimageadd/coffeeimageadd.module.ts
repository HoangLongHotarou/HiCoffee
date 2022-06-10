import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoffeeimageaddPageRoutingModule } from './coffeeimageadd-routing.module';

import { CoffeeimageaddPage } from './coffeeimageadd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoffeeimageaddPageRoutingModule
  ],
  declarations: [CoffeeimageaddPage]
})
export class CoffeeimageaddPageModule {}
