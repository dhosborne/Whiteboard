import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  endpoint = 'http://10.206.1.160:3000/issue/';

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: localStorage.getItem('LoggedInUser'),
      ContentType: 'application/x-www-form-urlencoded'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  public getIssues(): Observable<any> {
    return this.http.get(this.endpoint, this.httpOptions);
  }

  public getIssueGroup(id: string) {
    return this.http.get(this.endpoint + 'group/' + id, this.httpOptions)
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
