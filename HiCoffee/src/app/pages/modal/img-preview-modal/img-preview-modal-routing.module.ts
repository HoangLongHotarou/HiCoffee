import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImgPreviewModalPage } from './img-preview-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ImgPreviewModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImgPreviewModalPageRoutingModule {}
