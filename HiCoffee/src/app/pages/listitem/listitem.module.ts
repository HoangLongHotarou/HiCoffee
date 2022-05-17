import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListitemPageRoutingModule } from './listitem-routing.module';

import { ListitemPage } from './listitem.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListitemPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListitemPage]
})
export class ListitemPageModule {}
