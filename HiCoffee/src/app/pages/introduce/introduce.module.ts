import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroducePageRoutingModule } from './introduce-routing.module';

import { IntroducePage } from './introduce.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroducePageRoutingModule,
    RouterModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA,],
  declarations: [IntroducePage]
})
export class IntroducePageModule {}
