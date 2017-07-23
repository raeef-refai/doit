import {
  BrowserModule,
} from '@angular/platform-browser';
import {
  NgModule,
} from '@angular/core';
import {
  AppRoutingModule,
} from './app-routing.module';
import {
  AppComponent,
} from './app.component';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
} from '@angular/common/http';
import {
  AuthInterceptorService,
} from './auth/auth-interceptor.service';
import {
  AuthedGuardService,
} from './auth/authed-guard.service';
import {
  UnauthedGuardService,
} from './auth/unauthed-guard.service';
import {
  AccountService,
} from './auth/account.service';
import {
  BackendService,
} from './shared/backend.service';
import {
  AgmCoreModule,
} from '@agm/core';
import {
  environment,
} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey,
    }),
  ],
  providers: [
    AccountService,
    BackendService,
    AuthedGuardService,
    UnauthedGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {

  constructor(
    private _account: AccountService,
  ) {
    this._account.check();
  }

}
