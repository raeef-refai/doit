import {
  Injectable,
} from '@angular/core';
import {
  LocalStorage,
} from '../shared/local-storage.decorator';
import {
  AccessToken,
} from '../shared/models/access-token';
import {
  Account,
} from '../shared/models/account';

@Injectable()
export class AccountService {

  @LocalStorage('$DoIt$account') private _account: Account;
  @LocalStorage('$DoIt$token') private _accessToken: AccessToken;

  private _isLoggedIn = false;

  constructor() { }

  check() {
    if (this._accessToken && this._account) {
      this._isLoggedIn = true;
    }
  }

  clear() {
    this._accessToken = null;
    this._account = null;
    this._isLoggedIn = false;
  }

  set(accessToken: AccessToken) {
    this._account = accessToken.user;

    delete accessToken.user;

    this._accessToken = accessToken;

    this._isLoggedIn = true;
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  get account(): Account {
    return this._account;
  }

  get accessToken(): AccessToken {
    return this._accessToken;
  }

}
