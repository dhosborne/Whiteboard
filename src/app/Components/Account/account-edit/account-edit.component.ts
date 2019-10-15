import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../Common/confirmation-dialog/confirmation-dialog.component';
import { AccountService } from 'src/app/Services/account.service';
import { IUser } from '../../../Interfaces/user';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

  accountForm: FormGroup = this.createForm({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    employeeNumber: '',
    passportExpires: '',
    shirtSize: '',
    jacketSize: '',
    duties: [''],
    role: ''
  });

  id: string;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private flash: NgFlashMessageService,
    private title: Title,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.setTitle();

    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');

      this.accountService.getAccount(this.id)
      .subscribe(data => {
        console.log('data: ', data);
        this.updateForm(data.user);
      });
    }
  }

  private createForm(model: IUser): FormGroup {
    return this.fb.group(model);
  }

  private updateForm(model: Partial<IUser>): void {
    this.accountForm.patchValue(model);
  }

  redirect(): void {
    this.router.navigate(['/account/' + this.id]);
  }

  onSubmit() {
    if (this.accountForm.invalid) {
      return;
    }

    this.accountForm.removeControl('_id');
    const formValues = this.accountForm.value;

    if (this.route.snapshot.paramMap.has('id')) {
      const id = this.route.snapshot.paramMap.get('id');
      this.accountService.updateAccount(id, formValues)
      .subscribe(data => {
        this.showMessage(data.message);
        this.redirect();
      });
    }
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you really want to delete this account?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.accountService.deleteAccount(this.route.snapshot.paramMap.get('id'))
        .subscribe(data => {
          this.showMessage(data.message);
          this.router.navigate(['']);
        });
      } else {
        this.showMessage('Cancelled Delete');
      }
    });
  }

  onCancel(): void {
    this.redirect();
  }

  private showMessage(message): void {
    this.flash.showFlashMessage({
      messages: [message],
      dismissible: true,
      timeout: 10000,
      type: 'info'
    });
  }

  get f() {
    return this.accountForm.controls;
  }

  private setTitle(): void {
    this.route.data.subscribe(data => {
      if (data) {
        this.title.setTitle(data.title);
      }
    });
  }
}
