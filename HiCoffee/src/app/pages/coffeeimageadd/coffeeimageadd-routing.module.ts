import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoffeeimageaddPage } from './coffeeimageadd.page';

const routes: Routes = [
  {
    path: '',
    component: CoffeeimageaddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoffeeimageaddPageRoutingModule {}
