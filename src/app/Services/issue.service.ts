import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { configurations } from 'src/environments/configurations';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  endpoint = configurations.backend + '/issue/';

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: sessionStorage.getItem('jwt'),
      ContentType: 'application/x-www-form-urlencoded'
    }),
    params: {}
  };

  constructor(
    private http: HttpClient
  ) { }

  public getIssues(): Observable<any> {
    return this.http.get(this.endpoint, this.httpOptions);
  }

  public getIssueGroup(asset: string): Observable<any> {
    const params = new HttpParams().set('asset', asset);
    this.httpOptions.params = params;
    return this.http.get(this.endpoint + 'group/', this.httpOptions);
  }

  public getIssue(id: string): Observable<any> {
    return this.http.get(this.endpoint + id, this.httpOptions);
  }

  public createIssue(issue: object): Observable<any> {
    return this.http.post(this.endpoint, issue, this.httpOptions);
  }

  public updateIssue(id: string, issue: object): Observable<any> {
    return this.http.patch(this.endpoint + id, issue, this.httpOptions);
  }

  public deleteIssue(id: string): Observable<any> {
    return this.http.delete(this.endpoint + id, this.httpOptions);
  }
}
