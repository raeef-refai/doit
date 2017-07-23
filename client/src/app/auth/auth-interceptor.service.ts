import {
  Injectable,
} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  Observable,
} from 'rxjs/Observable';
import {
  Router,
} from '@angular/router';
import {
  AccountService,
} from './account.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private _router: Router,
    private _account: AccountService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._account.isLoggedIn) {
      request = request.clone({
        setHeaders: {
          'X-Access-Token': `${this._account.accessToken.id}`,
        },
      });
    }

    return next.handle(request)
      .catch((error: any, val: Observable<HttpEvent<any>>) => {
        if (error instanceof HttpErrorResponse && [401, 403].indexOf(error.status) !== -1) {
          this._account.clear();

          this._router.navigate(['/account/login']);
        }

        return Observable.throw(error);
      });
  }
}
