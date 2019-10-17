import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';
import { User } from 'src/app/Classes/user';
import { IUser } from 'src/app/Interfaces/user';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/Services/common.service';
import { ConfirmationDialogComponent } from '../../Common/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-admin-account-edit',
  templateUrl: './admin-account-edit.component.html',
  styleUrls: ['./admin-account-edit.component.css']
})
export class AdminAccountEditComponent implements OnInit {
  id: string;
  user: User;
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private fb: FormBuilder,
    private common: CommonService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');

      this.accountService.getAccount(this.id)
      .subscribe(data => {
        this.updateForm(data.user);
      });
    }
  }

  onSubmit(): void {
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

  onCancel(): void {
    this.redirect();
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

  private createForm(model: IUser): FormGroup {
    return this.fb.group(model);
  }

  private updateForm(model: Partial<IUser>): void {
    this.accountForm.patchValue(model);
  }

  private redirect(): void {
    this.router.navigate(['/admin']);
  }

  get f() {
    return this.accountForm.controls;
  }
}
