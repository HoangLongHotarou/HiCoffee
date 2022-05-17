import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListitemPage } from './listitem.page';

const routes: Routes = [
  {
    path: '',
    component: ListitemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListitemPageRoutingModule {}
