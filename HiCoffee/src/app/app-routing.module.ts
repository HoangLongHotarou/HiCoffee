import { IntroGuard } from './guards/intro.guard';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutoLoginGuard } from './guards/auto-login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'introduce',
    // redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    // canLoad: [AutoLoginGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule),
  },
  {
    path: 'introduce',
    loadChildren: () => import('./pages/introduce/introduce.module').then( m => m.IntroducePageModule),
    // canLoad: [AuthGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
  },
  {
    path: 'forgetpassword',
    loadChildren: () => import('./pages/forgetpassword/forgetpassword.module').then( m => m.ForgetpasswordPageModule)
  },
  {
    path: 'test-feature',
    loadChildren: () => import('./pages/test-feature/test-feature.module').then( m => m.TestFeaturePageModule)
  },
  {
    path: 'test-feature-ii',
    loadChildren: () => import('./pages/test-feature-ii/test-feature-ii.module').then( m => m.TestFeatureIiPageModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
