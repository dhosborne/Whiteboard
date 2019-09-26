import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../../../Services/login.service';
import { ValidationService } from '../../../Services/validation.service';
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
  signUpForm = this.fb.group({
    username: ['', [
      Validators.required,
      Validators.minLength(3),
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
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [
      Validators.required,
      Validators.pattern(this.vs.validEmailPattern), // matches first.last@
      this.vs.emailDomainValidator] // matches only approved domains
    ],
    employeeNumber: ['', [
      Validators.required,
      Validators.minLength(6)]
    ]
  }, {validators: [this.vs.checkPasswords]});

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private flash: NgFlashMessageService,
    private title: Title,
    private route: ActivatedRoute,
    private vs: ValidationService,
  ) { }

  ngOnInit() {
    this.setTitle();
  }

  signUp(): void {
    const formValues = this.signUpForm.value;

    this.loginService.signup(formValues)
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
