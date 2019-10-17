import { Component, OnInit } from '@angular/core';
import { User } from '../../../Classes/user';
import { AdministrationService } from '../../../Services/administration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  userList: Array<User>;

  constructor(
    private admin: AdministrationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.admin.listAccounts().subscribe(data => {
      const users = new Array<any>();
      data.users.forEach(user => {
        users.push(user);
      });
      users.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1);
      this.userList = users;
    });
  }

  onClick(id: string): void {
    this.router.navigate(['/admin/account/', id]);
  }

}
