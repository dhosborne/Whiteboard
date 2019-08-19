import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../Services/login.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from '../../../Interfaces/login';
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthService } from '../../../Services/auth.service';

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
    private _loginService: LoginService,
    private _fb: FormBuilder,
    private _router: Router,
    private _auth: AuthService,
    private _flash: NgFlashMessageService

  ) { }

  ngOnInit() {
    this.loginForm.controls.username.setValidators(Validators.required);
    this.loginForm.controls.password.setValidators(Validators.required);
  }

  private createForm(model: ILogin): FormGroup {
    return this._fb.group(model);
  }

  logIn(): void {
    this._loginService.login(this.loginForm.value)
    .subscribe(data => {
      this._auth.sendToken(data.token);
      this._auth.setUser(JSON.stringify(data.user));
      this._router.navigate(['/']);
    }, err => {
      console.log(err);
      this.showMessage(err.message);
    });
  }

  showMessage(message): void {
    this._flash.showFlashMessage({
        messages: [message],
        dismissible: true,
        timeout: 10000,
        type: 'info'
    });
  }

  get f() {
    return this.loginForm.controls;
  }
}
