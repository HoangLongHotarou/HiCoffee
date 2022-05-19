import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupcoffeePage } from './signupcoffee.page';

const routes: Routes = [
  {
    path: '',
    component: SignupcoffeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupcoffeePageRoutingModule {}
