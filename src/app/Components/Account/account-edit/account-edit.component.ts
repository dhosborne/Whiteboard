import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../Common/confirmation-dialog/confirmation-dialog.component';
import { AccountService } from 'src/app/Services/account.service';
import { IUser } from '../../../Interfaces/user';
import { CommonService } from 'src/app/Services/common.service';

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
    role: '',
    position: ''
  });

  id: string;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.setTitle();

    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');

      this.accountService.getAccount(this.id)
      .subscribe(data => {
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
        this.common.showMessage(data.message, data.level);
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
          this.common.showMessage(data.message, data.level);
          this.router.navigate(['']);
        });
      } else {
        this.common.showMessage('Cancelled Delete', 'success');
      }
    });
  }

  onCancel(): void {
    this.redirect();
  }

  get f() {
    return this.accountForm.controls;
  }

  private setTitle(): void {
    this.route.data.subscribe(data => {
      if (data) {
        this.common.setPageTitle(data.title);
      }
    });
  }
}
