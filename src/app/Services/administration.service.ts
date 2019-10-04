import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountService } from '../Services/account.service';
import { User } from '../Classes/user';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {
  private usersListSubject: BehaviorSubject<User[]>;
  public userList: Observable<User[]>;
  private userArray: Array<User>;

  constructor(
    private accountService: AccountService,
  ) {
    this.requestUsers();
    this.usersListSubject = new BehaviorSubject<User[]>(this.getUsers());
    this.userList = this.usersListSubject.asObservable();
  }

  getUsers() {
    return this.userArray;
  }

  private requestUsers() {
    this.accountService.listAccounts()
      .subscribe(data => {
        this.userArray = data.users;
        console.log('data: ', data);
      });
  }
}
