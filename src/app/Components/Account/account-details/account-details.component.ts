import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../Services/account.service';
import { User } from '../../../Classes/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  account: User;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
  ) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('id')) {
      const id = this.route.snapshot.paramMap.get('id');
      this.accountService.getAccount(id)
      .subscribe((account: User) => {
        this.account = account['user'];
        console.log(this.account)
      });
    }
  }

  editClick(id: string): void {
    this.router.navigate(['/account/' + id + '/edit']);
  }
}
