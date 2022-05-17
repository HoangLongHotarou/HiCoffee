import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoremenuPageRoutingModule } from './moremenu-routing.module';

import { MoremenuPage } from './moremenu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoremenuPageRoutingModule
  ],
  declarations: [MoremenuPage]
})
export class MoremenuPageModule {}
