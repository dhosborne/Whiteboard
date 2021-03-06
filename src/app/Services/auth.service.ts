import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Classes/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from './login.service';
import { CommonService } from './common.service';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private myRoute: Router,
    private loginService: LoginService,
    private common: CommonService
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

  userIsAdmin(): boolean {
    const user = this.getUser();
    if (user.role === 'Admin') {
      return true;
    } else {
      return false;
    }
  }

  login(login): boolean {
    this.loginService.login(login)
      .subscribe(data => {
        console.log(data);
        if (data.success) {
          this.setToken(data.token);
          // update the behavior subject with the new user value
          this.currentUserSubject.next(jwtHelper.decodeToken(data.token));
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
