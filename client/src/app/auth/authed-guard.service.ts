import {
  Injectable,
} from '@angular/core';
import {
  Router,
  CanActivate,
} from '@angular/router';
import {
  AccountService,
} from './account.service';

@Injectable()
export class AuthedGuardService implements CanActivate {

  constructor(
    private _router: Router,
    private _account: AccountService,
  ) { }

  canActivate() {
    if (this._account.isLoggedIn) {
      return true;
    }

    this._router.navigate([
      '/account/login',
    ]);

    return false;
  }

}
