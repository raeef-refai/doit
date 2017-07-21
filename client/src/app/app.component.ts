import {
  Component,
} from '@angular/core';
import {
  AccountService,
} from './auth/account.service';
import {
  BackendService,
} from './shared/backend.service';
import {
  Router,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss',
  ],
})
export class AppComponent {
  title = 'app';

  constructor(
    public account: AccountService,
    private _router: Router,
    private _backend: BackendService,
  ) { }

  logout(event: MouseEvent) {
    event.preventDefault();

    this._backend.post('Accounts', {}, 'logout').subscribe();

    this.account.clear();

    this._router.navigate(['/account/login']);
  }
}
