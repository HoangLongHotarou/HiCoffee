import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoUpdatePage } from './info-update.page';

const routes: Routes = [
  {
    path: '',
    component: InfoUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoUpdatePageRoutingModule {}
