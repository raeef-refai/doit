import {
  OnInit,
  OnDestroy,
  Component,
  ElementRef,
  ViewChildren,
  AfterViewInit,
} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  FormControlName,
} from '@angular/forms';
import {
  Router,
} from '@angular/router';
import {
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  Observable,
} from 'rxjs/Observable';
import {
  Subscription,
} from 'rxjs/Subscription';
import {
  BackendService,
} from '../../shared/backend.service';
import {
  AccessToken,
} from '../../shared/models/access-token';
import {
  AccountService,
} from '../../auth/account.service';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import * as _ from 'lodash';

function passwordMatch(control: AbstractControl): { [error: string]: boolean } | null {
  if (control.parent) {
    const passwordControl = control.parent.get('password');

    if (passwordControl.value !== control.value) {
      return {
        passwordNotMatch: true,
      };
    }
  }

  return null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.scss',
  ],
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {

  private _formSsubscription: Subscription;
  private _errorMessages = {
    email: 'Invalid email.',
    required: 'Required.',
    minlength: 'Password should be 6 characters at least.',
    passwordNotMatch: 'Password does not match.',
    uniqueness: 'Email already exist.',
  };

  errors: { [key: string]: string } = {};
  isLoading = false;
  registerForm: FormGroup;

  @ViewChildren(FormControlName, {
    read: ElementRef,
  }) private _controlsElements: ElementRef[];

  constructor(
    private _router: Router,
    private _account: AccountService,
    private _backend: BackendService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
        ],
      ],
      lastName: '',
      email: [
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
        ],
      ],
      passwordConfirmation: [
        '',
        [
          Validators.required,
          passwordMatch,
        ],
      ],
    });
  }

  ngAfterViewInit() {
    const blurObservables: Observable<any>[] = this._controlsElements
      .map(element => Observable.fromEvent(element.nativeElement, 'blur'));

    this._formSsubscription = Observable.merge(this.registerForm.valueChanges, ...blurObservables)
      .debounceTime(500)
      .subscribe(() => {
        this.errors = _.mapValues(this.registerForm.controls, (control: AbstractControl) => {
          return control.errors && control.touched ? this._errorMessages[_.keys(control.errors)[0]] : null;
        });
      });
  }

  ngOnDestroy() {
    this._formSsubscription.unsubscribe();
  }

  submitHandler() {
    this.isLoading = true;

    const values: any = _.chain(this.registerForm.value).cloneDeep()
      .pickBy((value: any) => value || value === false).value();

    delete values.passwordConfirmation;

    this._backend.post('account', values).subscribe((val) => {
      const params = new HttpParams()
        .set('include', 'user');

      this._backend.post('Accounts', {
        email: values.email,
        password: values.password,
      }, 'login', params).subscribe((accessToken: AccessToken) => {
        this._account.set(accessToken);

        this._router.navigate(['home']);
      });

    }, (res: any) => {
      if (res instanceof HttpErrorResponse && res.status === 422) {
        _.each(res.error.error.details.codes, (val, key) =>
          this.registerForm.get(key).setErrors({
            [val[0]]: true,
          })
        );

        this.registerForm.updateValueAndValidity();
      }
    }, () => this.isLoading = false);
  }

}
