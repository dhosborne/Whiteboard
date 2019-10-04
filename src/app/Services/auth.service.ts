import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Classes/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { configurations } from 'src/environments/configurations';
import { LoginService } from './login.service';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  endpoint = configurations.backend;

  constructor(
    private myRoute: Router,
    private loginService: LoginService
    ) {
    this.currentUserSubject = new BehaviorSubject<User>(this.getUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  setToken(token: string) {
    return sessionStorage.setItem('jwt', token);
  }
  getToken() {
    return sessionStorage.getItem('jwt');
  }
  getUser() {
    return jwtHelper.decodeToken(sessionStorage.getItem('jwt'));
  }

  isTokenFresh(token: string): boolean {
    const decoded = jwtHelper.decodeToken(token);

    if (decoded) {
      if (Date.now() >= decoded.exp / 1000) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }

  login(login): boolean {
    this.loginService.login(login)
      .subscribe(data => {
        if (data.success) {
          this.setToken(data.token);
          this.myRoute.navigate(['/']);
        }
      });
    if (this.isLoggedIn) {
      return true;
    } else {
      return false;
    }

  }

  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('jwt');
    if (this.isTokenFresh(token)) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.myRoute.navigate(['login']);
    sessionStorage.clear();
  }
}
