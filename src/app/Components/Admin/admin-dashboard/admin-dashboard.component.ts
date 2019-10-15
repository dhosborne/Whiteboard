import { Component, OnInit } from '@angular/core';
import { User } from '../../../Classes/user';
import { AdministrationService } from '../../../Services/administration.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  userList: Array<User>;

  constructor(
    private admin: AdministrationService
  ) { }

  ngOnInit() {
    this.admin.listAccounts().subscribe(data => {
      console.log(data.users);
    });
  }

}
