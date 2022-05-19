import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestFeatureIiPageRoutingModule } from './test-feature-ii-routing.module';

import { TestFeatureIiPage } from './test-feature-ii.page';
import { ComponentsModule } from 'src/app/modules/component/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestFeatureIiPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TestFeatureIiPage]
})
export class TestFeatureIiPageModule {}
