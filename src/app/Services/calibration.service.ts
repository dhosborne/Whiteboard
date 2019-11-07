import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { configurations } from 'src/environments/configurations';

@Injectable({
  providedIn: 'root'
})
export class CalibrationService {

  endpoint = configurations.backend + '/calibration/';
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: sessionStorage.getItem('jwt'),
      ContentType: 'application/x-www-form-urlencoded'
    })
  };
  constructor(private http: HttpClient) { }

  public getCalibrations(): Observable<any> {
    return this.http.get(this.endpoint, this.httpOptions);
  }

  public getInactive(): Observable<any> {
    return this.http.get(this.endpoint + 'inactive', this.httpOptions);
  }

  public getCalibration(id): Observable<any> {
    return this.http.get(this.endpoint + id, this.httpOptions);
  }

  public createCalibration(calibration): Observable<any> {
    return this.http.post(this.endpoint, calibration, this.httpOptions);
  }

  public updateCalibration(id, calibration): Observable<any> {
    return this.http.patch(this.endpoint + id, calibration, this.httpOptions);
  }

  public deleteCalibration(id): Observable<any> {
    return this.http.delete(this.endpoint + id, this.httpOptions);
  }
}
