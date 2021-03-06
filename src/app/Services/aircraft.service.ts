import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { configurations } from 'src/environments/configurations';



@Injectable({
  providedIn: 'root'
})
export class AircraftService {
  endpoint = configurations.backend + '/aircraft/';
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: sessionStorage.getItem('jwt'),
      ContentType: 'application/x-www-form-urlencoded'
    })
  };

  constructor(private http: HttpClient) { }

  public getAircrafts(): Observable<any> {
    return this.http.get(this.endpoint, this.httpOptions);
  }

  public getInactive(): Observable<any> {
    return this.http.get(this.endpoint + 'inactive', this.httpOptions);
  }

  public getAircraft(id): Observable<any> {
    return this.http.get(this.endpoint + id, this.httpOptions);
  }

  public createAircraft(aircraft): Observable<any> {
    return this.http.post(this.endpoint, aircraft, this.httpOptions);
  }

  public updateAircraft(id, aircraft): Observable<any> {
    return this.http.patch(this.endpoint + id, aircraft, this.httpOptions);
  }

  public deleteAircraft(id): Observable<any> {
    return this.http.delete(this.endpoint + id, this.httpOptions);
  }
}
