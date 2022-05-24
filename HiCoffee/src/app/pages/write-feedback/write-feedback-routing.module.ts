import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WriteFeedbackPage } from './write-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: WriteFeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WriteFeedbackPageRoutingModule {}
