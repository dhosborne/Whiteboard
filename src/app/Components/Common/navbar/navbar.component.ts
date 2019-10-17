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
  navBarOpen = false;

  constructor(
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.currentUser.subscribe(data => {
      this.user = data;
    });
  }

  logout() {
    sessionStorage.removeItem('jwt');
    this.router.navigate(['login']);
  }

  toggleNavbar(): void {
    this.navBarOpen = !this.navBarOpen;
  }
}
