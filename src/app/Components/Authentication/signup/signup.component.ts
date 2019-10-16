import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../Services/login.service';
import { ValidationService } from '../../../Services/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm = this.fb.group({
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
    private route: ActivatedRoute,
    private vs: ValidationService,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.setTitle();
  }

  signUp(): void {
    const formValues = this.signUpForm.value;

    this.loginService.signup(formValues)
    .subscribe( data => {
      if (!data.success) {
        this.common.showMessage(data.message, data.level);
      } else {
        this.common.showMessage(data.message, data.level);
        this.router.navigate(['/admin']);
      }
    });
  }
  get f() {
    return this.signUpForm.controls;
  }

  private setTitle(): void {
    this.route.data.subscribe(data => {
      this.common.setPageTitle(data.title);
    });
  }
}
