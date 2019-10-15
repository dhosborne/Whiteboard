import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { configurations } from '../../../src/environments/configurations';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  endpoint = configurations.backend + '/account/';
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: sessionStorage.getItem('jwt'),
      ContentType: 'application/x-www-form-urlencoded'
    })
  };

  constructor(private http: HttpClient) { }

  public getAccount(id: string): Observable<any> {
    return this.http.get(this.endpoint + id, this.httpOptions);
  }

  public updateAccount(id: string, account: any): Observable<any> {
    return this.http.patch(this.endpoint + id, account, this.httpOptions);
  }

  public deleteAccount(id: string): Observable<any> {
    return this.http.delete(this.endpoint + id, this.httpOptions);
  }
}
