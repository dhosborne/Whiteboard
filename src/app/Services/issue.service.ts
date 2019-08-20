import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from '../Classes/issue';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  endpoint = 'http://10.206.1.160:3000/issue/';

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: localStorage.getItem('LoggedInUser'),
      ContentType: 'application/x-www-form-urlencoded'
    }),
    params: new HttpParams({})
  };

  constructor(
    private http: HttpClient
  ) { }

  public getIssues(): Observable<any> {
    return this.http.get(this.endpoint, this.httpOptions);
  }

  public getIssueGroup(asset: string) {
    console.log(asset);
    this.httpOptions.params.append('asset', asset);
    console.log(this.httpOptions);
    return this.http.get<Issue[]>(this.endpoint + 'group/', this.httpOptions);
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
