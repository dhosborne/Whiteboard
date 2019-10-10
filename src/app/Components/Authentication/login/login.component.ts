import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { CommonService } from '../../../Services/common.service';
import { ValidationService } from '../../../Services/validation.service';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.pattern(this.vs.validEmailPattern),
      this.vs.emailDomainValidator
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25)
    ]]
  });
  data: any;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private common: CommonService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private vs: ValidationService
  ) { }

  ngOnInit() {
    this.setTitle();
    this.purgeSession();
  }

  logIn(): void {
    if (this.authService.login(this.loginForm.value)) {
      return;
    } else {
      this.common.showMessage('Verify username and password, Try Again', 'danger');
    }
  }

  keypressed(event): void {
    const ENTER_KEY_CODE = 13;
    if (event.key === 'Enter' || event.keyCode === ENTER_KEY_CODE) {
      event.stopPropagation();
      this.logIn();
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  private setTitle(): void {
    this.route.data.subscribe(data => {
      this.common.setPageTitle(data.title);
    });
  }

  private purgeSession(): void {
    sessionStorage.clear();
  }
}
