import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestFeatureIiPage } from './test-feature-ii.page';

const routes: Routes = [
  {
    path: '',
    component: TestFeatureIiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestFeatureIiPageRoutingModule {}
