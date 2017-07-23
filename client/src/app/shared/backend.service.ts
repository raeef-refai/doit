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
import {
  plural,
} from 'pluralize';
import * as _ from 'lodash';

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

    model = plural(_.chain(model).camelCase().upperFirst().value());

    return this._http.post(`${environment.baseApiUrl}/${model}${action}`, data, options);
  }

  createRel(model: string, id: string, relModel: string, data?: any): Observable<any> {
    model = plural(_.chain(model).camelCase().upperFirst().value());

    relModel = plural(_.chain(relModel).camelCase().value());

    return this._http.post(`${environment.baseApiUrl}/${model}/${id}/${relModel}`, data);
  }

  deleteRel(model: string, id: string, relModel: string, params?: HttpParams): Observable<any> {
    model = plural(_.chain(model).camelCase().upperFirst().value());

    relModel = plural(_.chain(relModel).camelCase().value());

    const options = {
      params: params || new HttpParams(),
    };

    return this._http.delete(`${environment.baseApiUrl}/${model}/${id}/${relModel}`, options);
  }

  listRel(model: string, id: string, relModel: string): Observable<any> {
    model = plural(_.chain(model).camelCase().upperFirst().value());

    relModel = plural(_.chain(relModel).camelCase().value());

    return this._http.get(`${environment.baseApiUrl}/${model}/${id}/${relModel}`);
  }

}
