import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _router: Router,
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this._router.navigate(['login']);
  }
}
