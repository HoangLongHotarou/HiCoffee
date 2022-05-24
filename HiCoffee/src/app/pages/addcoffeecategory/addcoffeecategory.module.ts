import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcoffeecategoryPageRoutingModule } from './addcoffeecategory-routing.module';

import { AddcoffeecategoryPage } from './addcoffeecategory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddcoffeecategoryPageRoutingModule
  ],
  declarations: [AddcoffeecategoryPage]
})
export class AddcoffeecategoryPageModule {}
