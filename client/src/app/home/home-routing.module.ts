import {
  NgModule,
} from '@angular/core';
import {
  Routes,
  RouterModule,
} from '@angular/router';
import {
  HomeComponent,
} from './home.component';
import {
  AuthedGuardService,
} from '../auth/authed-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [
      AuthedGuardService,
    ],
    data: {
      title: 'Home',
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class HomeRoutingModule { }
