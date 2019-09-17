import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../Services/common.service';
import { ValidationService } from '../../../Services/validation.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../../../Services/login.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {
  passForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.pattern(this.vs.validEmailPattern), // matches first.last@
      this.vs.emailDomainValidator] // matches only approved domains
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
    ],
  }, {validators: [this.vs.checkPasswords]});

  constructor(
    private common: CommonService,
    private login: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private vs: ValidationService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.common.setPageTitle(data.title);
    });
  }

  onSubmit() {
    const formValues = this.passForm.value;
    this.login.changePassword(formValues)
    .subscribe(result => {
      if (result.success) {
        this.common.showMessage(result.message, result.alert);
        this.router.navigate(['logout']);
      } else {
        this.common.showMessage(result.message, result.alert);
      }
    });
  }

  get f() {
    return this.passForm.controls;
  }

}
