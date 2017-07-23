import {
  NgModule,
} from '@angular/core';
import {
  CommonModule,
} from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  AccountRoutingModule,
} from './account-routing.module';
import {
  LoginComponent,
} from './login/login.component';
import {
  RegisterComponent,
} from './register/register.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
})
export class AccountModule { }
