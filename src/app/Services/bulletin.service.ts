import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { configurations } from 'src/environments/configurations';


@Injectable({
  providedIn: 'root'
})
export class BulletinService {
  endpoint = configurations.backend + '/bulletin/';
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: sessionStorage.getItem('jwt'),
      ContentType: 'application/x-www-form-urlencoded'
    })
  };
  constructor( private http: HttpClient) { }

  public getBulletins(): Observable<any> {
    return this.http.get(this.endpoint, this.httpOptions);
  }

  public getBulletin(id): Observable<any> {
    return this.http.get(this.endpoint + id, this.httpOptions);
  }

  public createBulletin(bulletin): Observable<any> {
    return this.http.post(this.endpoint, bulletin, this.httpOptions)
  }

  public updateBulletin(id, bulletin): Observable<any> {
    return this.http.patch(this.endpoint + id, bulletin, this.httpOptions);
  }

  public deleteBulletin(id): Observable<any> {
    return this.http.delete(this.endpoint + id, this.httpOptions);
  }
}
