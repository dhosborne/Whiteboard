import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { configurations } from '../../../src/environments/configurations';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {
  endpoint = configurations.backend + '/users/';
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: sessionStorage.getItem('jwt'),
      ContentType: 'application/x-www-form-urlencoded'
    })
  };

  constructor( private http: HttpClient) {}

  public listAccounts(): Observable<any> {
    return this.http.get(this.endpoint, this.httpOptions);
  }
}
