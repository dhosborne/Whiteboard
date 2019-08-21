import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private myRoute: Router) { }

  setToken(token: string) {
    return sessionStorage.setItem('jwt', token);
  }
  getToken() {
    return sessionStorage.getItem('jwt');
  }

  isTokenFresh(token: string): boolean {
    const decoded = jwtHelper.decodeToken(token);

    if (Date.now() >= decoded.exp * 1000) {
      return true;
    } else {
      return false;
    }
  }

  isLoggedIn(): boolean {
    const token = this.getToken();

    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        return true;
      } else {
        return false;
      }
    }  else {
      return false;
    }
  }

  logout() {
    this.myRoute.navigate(['login']);
    sessionStorage.clear();
  }
}
