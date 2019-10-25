import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../../Services/validation.service';
import { CommonService } from 'src/app/Services/common.service';
import { AdministrationService } from '../../../Services/administration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-password-change',
  templateUrl: './admin-password-change.component.html',
  styleUrls: ['./admin-password-change.component.css']
})
export class AdminPasswordChangeComponent implements OnInit {
  adminPassForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.pattern(this.vs.validEmailPattern),
      this.vs.emailDomainValidator]
    ],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25)]
    ],
    passConfirm: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25)]
    ]
  }, {validators: [this.vs.checkPasswords]});

  constructor(
    private fb: FormBuilder,
    private vs: ValidationService,
    private common: CommonService,
    private router: Router,
    private admin: AdministrationService
  ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    const payload = this.adminPassForm.value;
    this.admin.adminPasswordChange(payload).subscribe(data => {
      if (!data.success) {
        this.common.showMessage(data.message, data.level);
        return;
      } else {
        this.common.showMessage(data.message, data.level);
        this.router.navigate(['/admin']);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin']);
  }

  get f() {
    return this.adminPassForm.controls;
  }

}
