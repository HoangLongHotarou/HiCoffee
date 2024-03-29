import { AuthGuard } from './../../guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'checkin',
        loadChildren: () => import('../../pages/checkin/checkin.module').then(m => m.CheckinPageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'user',
        loadChildren: () => import('../../pages/user/user.module').then(m => m.UserPageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'moremenu',
        loadChildren: () => import('../moremenu/moremenu.module').then(m => m.MoremenuPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      },
      {
        path: 'bound',
        loadChildren: () => import('../../pages/bound/bound.module').then(m => m.BoundPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
