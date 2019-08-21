import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../Services/login.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ILogin } from '../../../Interfaces/login';
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthService } from '../../../Services/auth.service';
import { Title } from '@angular/platform-browser';
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
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private flash: NgFlashMessageService,
    private route: ActivatedRoute,
    private title: Title,
  ) { }

  ngOnInit() {
    this.setTitle();
    this.loginForm.controls.username.setValidators(Validators.required);
    this.loginForm.controls.password.setValidators(Validators.required);
  }

  private createForm(model: ILogin): FormGroup {
    return this.fb.group(model);
  }

  logIn(): void {
    this.loginService.login(this.loginForm.value)
    .subscribe(data => {
      const details = helper.decodeToken(data.token);
      sessionStorage.setItem('user', JSON.stringify(details));
      this.auth.setToken(data.token);
      this.router.navigate(['/']);
    }, err => {
      console.log(err);
      this.showMessage(err.message);
    });
  }

  showMessage(message): void {
    this.flash.showFlashMessage({
        messages: [message],
        dismissible: true,
        timeout: 10000,
        type: message.success
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  private setTitle(): void {
    this.route.data.subscribe(data => {
      this.title.setTitle(data.title);
    });
  }
}
