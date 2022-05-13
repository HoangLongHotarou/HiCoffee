import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestFeaturePage } from './test-feature.page';

const routes: Routes = [
  {
    path: '',
    component: TestFeaturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestFeaturePageRoutingModule {}
