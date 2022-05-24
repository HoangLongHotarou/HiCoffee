import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddcoffeecategoryPage } from './addcoffeecategory.page';

const routes: Routes = [
  {
    path: '',
    component: AddcoffeecategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddcoffeecategoryPageRoutingModule {}
