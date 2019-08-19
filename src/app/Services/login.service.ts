import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    endpoint = 'http://10.206.1.160:3000/';


    constructor(
        private http: HttpClient
    ) {}

    public login(login): Observable<any> {
        return this.http.post(this.endpoint + 'login', login);
    }

    public signup(signup): Observable<any> {
        return this.http.post(this.endpoint + 'signup', signup);
    }
}
