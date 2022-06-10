import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatecoffeePage } from './updatecoffee.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatecoffeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatecoffeePageRoutingModule {}
