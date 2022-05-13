import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestFeaturePageRoutingModule } from './test-feature-routing.module';

import { TestFeaturePage } from './test-feature.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestFeaturePageRoutingModule
  ],
  declarations: [TestFeaturePage]
})
export class TestFeaturePageModule {}
