import { IntroGuard } from './guards/intro.guard';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutoLoginGuard } from './guards/auto-login.guard';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'tabs/checkin',
    redirectTo: 'introduce',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    canLoad: [AutoLoginGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'introduce',
    loadChildren: () => import('./pages/introduce/introduce.module').then(m => m.IntroducePageModule),
    canLoad: [AutoLoginGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'forgetpassword',
    loadChildren: () => import('./pages/forgetpassword/forgetpassword.module').then(m => m.ForgetpasswordPageModule)
  },
  {
    path: 'listitem/:idList',
    loadChildren: () => import('./pages/listitem/listitem.module').then(m => m.ListitemPageModule)
  },
  {
    path: 'test-feature/:cafeObj',
    loadChildren: () => import('./pages/test-feature/test-feature.module').then(m => m.TestFeaturePageModule)
  },
  {
    path: 'test-feature-ii',
    loadChildren: () => import('./pages/test-feature-ii/test-feature-ii.module').then(m => m.TestFeatureIiPageModule),
  },
  {
    path: 'detailitem/:itemObj',
    loadChildren: () => import('./pages/detailitem/detailitem.module').then(m => m.DetailitemPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then(m => m.NotificationPageModule)
  },
  {
    path: 'signupcoffee',
    loadChildren: () => import('./pages/signupcoffee/signupcoffee.module').then(m => m.SignupcoffeePageModule)
  },
  {
    path: 'setting-page',
    loadChildren: () => import('./pages/setting-page/setting-page.module').then( m => m.SettingPagePageModule)
  },
  {
    path: 'addcoffeecategory/:idCoffee',
    loadChildren: () => import('./pages/addcoffeecategory/addcoffeecategory.module').then( m => m.AddcoffeecategoryPageModule)
  },
  {
    path: 'write-feedback/:coffeeShop',
    loadChildren: () => import('./pages/write-feedback/write-feedback.module').then( m => m.WriteFeedbackPageModule)
  },
  {
    path: 'img-preview-modal',
    loadChildren: () => import('./pages/img-preview-modal/img-preview-modal.module').then( m => m.ImgPreviewModalPageModule)
  },
  {
    path: 'topic',
    loadChildren: () => import('./pages/topic/topic.module').then( m => m.TopicPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
