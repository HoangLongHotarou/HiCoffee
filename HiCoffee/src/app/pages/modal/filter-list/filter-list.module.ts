import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterListPageRoutingModule } from './filter-list-routing.module';

import { FilterListPage } from './filter-list.page';
import { ComponentsModule } from 'src/app/modules/component/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterListPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [FilterListPage]
})
export class FilterListPageModule {}
