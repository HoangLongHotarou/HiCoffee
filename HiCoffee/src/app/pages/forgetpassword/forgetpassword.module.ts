import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgetpasswordPageRoutingModule } from './forgetpassword-routing.module';

import { ForgetpasswordPage } from './forgetpassword.page';

import { ComponentsModule } from 'src/app/modules/component/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgetpasswordPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ForgetpasswordPage]
})
export class ForgetpasswordPageModule {}
