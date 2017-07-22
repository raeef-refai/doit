import {
  Component,
} from '@angular/core';
import {
  NgForm,
} from '@angular/forms';
import {
  BackendService,
} from '../../shared/backend.service';
import {
  HttpParams,
} from '@angular/common/http';
import {
  AccessToken,
} from '../../shared/models/access-token';
import {
  AccountService,
} from '../../auth/account.service';
import {
  Router,
} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss',
  ],
})
export class LoginComponent {

  isLoading = false;
  showError = false;

  constructor(
    private _router: Router,
    private _account: AccountService,
    private _backend: BackendService,
  ) { }

  submit(form: NgForm) {
    this.isLoading = true;
    this.showError = false;

    const params = new HttpParams()
      .set('include', 'user');

    this._backend.post('Accounts', form.value, 'login', params).subscribe((accessToken: AccessToken) => {
      this._account.set(accessToken);

      this._router.navigate(['home']);
    }, () => {
      this.showError = true;
      this.isLoading = false;
    });
  }

}
