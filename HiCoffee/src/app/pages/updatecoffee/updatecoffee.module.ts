import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatecoffeePageRoutingModule } from './updatecoffee-routing.module';

import { UpdatecoffeePage } from './updatecoffee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatecoffeePageRoutingModule
  ],
  declarations: [UpdatecoffeePage]
})
export class UpdatecoffeePageModule {}
