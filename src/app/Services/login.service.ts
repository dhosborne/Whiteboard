import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { configurations } from 'src/environments/configurations';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    endpoint = configurations.backend;


    constructor(
        private http: HttpClient
    ) {}

    public login(login): Observable<any> {
        return this.http.post(this.endpoint + '/login', login);
    }

    public signup(signup): Observable<any> {
        return this.http.post(this.endpoint + '/signup', signup);
    }
}
