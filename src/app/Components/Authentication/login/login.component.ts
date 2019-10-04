import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { CommonService } from '../../../Services/common.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ILogin } from '../../../Interfaces/login';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.createForm({
    username: '',
    password: ''
  });
  data: any;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private common: CommonService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.setTitle();
    this.purgeSession();
    this.loginForm.controls.username.setValidators(Validators.required);
    this.loginForm.controls.password.setValidators(Validators.required);
  }

  private createForm(model: ILogin): FormGroup {
    return this.fb.group(model);
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
