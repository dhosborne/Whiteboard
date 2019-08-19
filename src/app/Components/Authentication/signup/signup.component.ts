import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../Services/login.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { ISignup } from '../../../Interfaces/signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup = this.createForm({
    username: '',
    password: '',
    passConfirm: '',
    firstName: '',
    lastName: ''
  });
  submitted = false;

  constructor(
    private _fb: FormBuilder,
    private _loginService: LoginService,
    private _router: Router,
    private _flash: NgFlashMessageService
  ) { }

  ngOnInit() {
    let c = this.signUpForm.controls;
    c.username.setValidators(Validators.required);
    c.password.setValidators(Validators.required);
    c.passConfirm.setValidators(Validators.required);
    c.firstName.setValidators(Validators.required);
    c.lastName.setValidators(Validators.required);
  }


  private createForm(model: ISignup): FormGroup {
    return this._fb.group(model);
  }

  signUp(): void {
    this.submitted = true;
    this._loginService.signup(this.signUpForm.value)
    .subscribe( res => {
      this._router.navigate(['login']);
    }, err => {
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
    return this.signUpForm.controls;
  }
}
