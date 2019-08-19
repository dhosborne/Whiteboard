import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShelterService {

  endpoint = 'http://10.206.1.160:3000/shelter/';

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: localStorage.getItem('LoggedInUser'),
      ContentType: 'application/x-www-form-urlencoded'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  public getShelters(): Observable<any> {
    return this.http.get(this.endpoint, this.httpOptions);
  }

  public getShelter(id: string): Observable<any> {
    return this.http.get(this.endpoint + id, this.httpOptions);
  }

  public createShelter(shelter: object): Observable<any> {
    return this.http.post(this.endpoint, shelter, this.httpOptions);
  }

  public updateShelter(id: string, shelter: object): Observable<any> {
    return this.http.patch(this.endpoint + id, shelter, this.httpOptions);
  }

  public deleteShelter(id: string): Observable<any> {
    return this.http.delete(this.endpoint + id, this.httpOptions);
  }
}