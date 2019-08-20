import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../Services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { ISignup } from '../../../Interfaces/signup';
import { Title } from '@angular/platform-browser';

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
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private flash: NgFlashMessageService,
    private title: Title,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.setTitle();
    const c = this.signUpForm.controls;
    c.username.setValidators(Validators.required);
    c.password.setValidators(Validators.required);
    c.passConfirm.setValidators(Validators.required);
    c.firstName.setValidators(Validators.required);
    c.lastName.setValidators(Validators.required);
  }


  private createForm(model: ISignup): FormGroup {
    return this.fb.group(model);
  }

  signUp(): void {
    this.submitted = true;
    this.loginService.signup(this.signUpForm.value)
    .subscribe( res => {
      this.router.navigate(['login']);
    }, err => {
      this.showMessage(err.message);
    });
  }

  showMessage(message): void {
    this.flash.showFlashMessage({
        messages: [message],
        dismissible: true,
        timeout: 10000,
        type: 'info'
    });
  }

  get f() {
    return this.signUpForm.controls;
  }

  private setTitle(): void {
    this.route.data.subscribe(data => {
      this.title.setTitle(data.title);
    });
  }
}
