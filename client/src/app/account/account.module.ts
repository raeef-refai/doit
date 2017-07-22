import {
  NgModule,
} from '@angular/core';
import {
  CommonModule,
} from '@angular/common';
import {
  FormsModule,
} from '@angular/forms';
import {
  AccountRoutingModule,
} from './account-routing.module';
import {
  LoginComponent,
} from './login/login.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AccountRoutingModule,
  ],
  declarations: [
    LoginComponent,
  ],
})
export class AccountModule { }
