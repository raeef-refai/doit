import {
  NgModule,
} from '@angular/core';
import {
  Routes,
  RouterModule,
} from '@angular/router';
import {
  LoginComponent,
} from './login/login.component';
import {
  UnauthedGuardService,
} from '../auth/unauthed-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [
      UnauthedGuardService,
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AccountRoutingModule { }
