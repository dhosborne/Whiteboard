import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../Services/common.service';
import { ValidationService } from '../../../Services/validation.service';
import { AuthService} from '../../../Services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../Services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {
  passForm = this.fb.group({
    email:[],
    oldPassword: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25)]
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
    private auth: AuthService,
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
    this.auth.currentUser.subscribe(user => {
      const email = user.email;
      const formValues = this.passForm.value;
      formValues.email = email;

      this.login.changePassword(formValues)
      .subscribe(result => {
        this.common.showMessage(result.message, result.alert);
        if (result.success) {
          this.router.navigate(['logout']);
        }
      });
    });
  }

  get f() {
    return this.passForm.controls;
  }

}
