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
  RegisterComponent,
} from './register/register.component';
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
    data: {
      title: 'Login',
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [
      UnauthedGuardService,
    ],
    data: {
      title: 'Register',
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
export class AccountRoutingModule { }
