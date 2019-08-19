import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  } from '../Classes/login'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private myRoute: Router) { }

  sendToken(token: string) {
    return localStorage.setItem('LoggedInUser', token);
  }
  getToken() {
    return localStorage.getItem('LoggedInUser');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  setUser(user: string) {
    localStorage.setItem('user', user);
  }

  logout() {
    localStorage.removeItem('LoggedInUser');
    localStorage.removeItem('User');
    this.myRoute.navigate(['login']);
  }
}
