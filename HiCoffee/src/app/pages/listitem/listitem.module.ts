import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListitemPageRoutingModule } from './listitem-routing.module';

import { ListitemPage } from './listitem.page';
import { ComponentsModule } from 'src/app/modules/component/component.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListitemPageRoutingModule,
    ComponentsModule,
    Ng2SearchPipeModule,
  ],
  declarations: [ListitemPage]
})
export class ListitemPageModule {}
