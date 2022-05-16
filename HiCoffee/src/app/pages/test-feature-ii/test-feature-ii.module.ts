import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestFeatureIiPageRoutingModule } from './test-feature-ii-routing.module';

import { TestFeatureIiPage } from './test-feature-ii.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestFeatureIiPageRoutingModule
  ],
  declarations: [TestFeatureIiPage]
})
export class TestFeatureIiPageModule {}
