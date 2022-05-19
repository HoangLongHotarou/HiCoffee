import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailitemPageRoutingModule } from './detailitem-routing.module';

import { DetailitemPage } from './detailitem.page';
import { ComponentsModule } from 'src/app/modules/component/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailitemPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DetailitemPage]
})
export class DetailitemPageModule {}
