import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { configurations } from 'src/environments/configurations';

@Injectable({
  providedIn: 'root'
})
export class UavconfigService {
  endpoint = configurations.backend + '/uavconfig/';
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: sessionStorage.getItem('jwt'),
      ContentType: 'application/x-www-form-urlencoded'
    })
  };

  constructor(private http: HttpClient) { }

  public getConfiguration(id): Observable<any> {
    return this.http.get(this.endpoint + id, this.httpOptions);
  }

  public createConfiguration(configuration): Observable<any> {
    return this.http.post(this.endpoint, configuration, this.httpOptions);
  }

  public updateConfiguration(id, configuration): Observable<any> {
    return this.http.patch(this.endpoint + id, configuration, this.httpOptions);
  }

  public deleteConfiguration(id): Observable<any> {
    return this.http.delete(this.endpoint + id, this.httpOptions);
  }
}
