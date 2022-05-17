import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoremenuPage } from './moremenu.page';

const routes: Routes = [
  {
    path: '',
    component: MoremenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoremenuPageRoutingModule {}
