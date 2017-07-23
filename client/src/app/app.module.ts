import {
  Title,
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
  Router,
  NavigationEnd,
  ActivatedRoute,
  Event as RouterEvent,
} from '@angular/router';
import {
  BackendService,
} from './shared/backend.service';
import {
  AgmCoreModule,
} from '@agm/core';
import {
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
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
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey,
      libraries: [
        'places',
      ],
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
    private _title: Title,
    private _route: ActivatedRoute,
    private _router: Router,
    private _account: AccountService,
  ) {
    this._account.check();

    _router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        let route: any = this._route.firstChild;

        while (route.firstChild) {
          route = route.firstChild;
        }

        this._title.setTitle(`DoIT - ${route.snapshot.data.title}`);
      }
    });
  }

}
