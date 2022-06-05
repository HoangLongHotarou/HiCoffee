import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestFeaturePageRoutingModule } from './test-feature-routing.module';

import { TestFeaturePage } from './test-feature.page';
import { ComponentsModule } from 'src/app/modules/component/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestFeaturePageRoutingModule,
    ComponentsModule,
  ],
  declarations: [TestFeaturePage]
})
export class TestFeaturePageModule {}
