import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;
  constructor(
    private _router: Router,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this._router.navigate(['login']);
  }
}
