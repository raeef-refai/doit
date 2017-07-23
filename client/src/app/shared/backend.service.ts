import {
  Injectable,
} from '@angular/core';
import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';
import {
  Observable,
} from 'rxjs/Observable';
import {
  environment,
} from '../../environments/environment';

@Injectable()
export class BackendService {

  constructor(
    private _http: HttpClient,
  ) { }

  post(model: string, data?: any, action?: string, params?: HttpParams): Observable<any> {
    action = action ? `/${action}` : '';

    const options = {
      params: params || new HttpParams(),
    };

    return this._http.post(`${environment.baseApiUrl}/${model}${action}`, data, options);
  }

}
