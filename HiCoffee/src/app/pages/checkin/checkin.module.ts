import { ComponentsModule } from 'src/app/modules/component/component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckinPageRoutingModule } from './checkin-routing.module';

import { CheckinPage } from './checkin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckinPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CheckinPage]
})
export class CheckinPageModule {}
