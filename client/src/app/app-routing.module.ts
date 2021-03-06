import {
  NgModule,
} from '@angular/core';
import {
  Routes,
  RouterModule,
} from '@angular/router';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: 'app/account/account.module#AccountModule',
  },
  {
    path: 'home',
    loadChildren: 'app/home/home.module#HomeModule',
  },
  {
    path: 'about',
    loadChildren: 'app/about/about.module#AboutModule',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
