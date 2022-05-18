import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailitemPage } from './detailitem.page';

const routes: Routes = [
  {
    path: '',
    component: DetailitemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailitemPageRoutingModule {}
