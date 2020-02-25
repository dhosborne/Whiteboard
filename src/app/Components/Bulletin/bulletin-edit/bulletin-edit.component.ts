import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common.service';
import { AuthService } from 'src/app/Services/auth.service';
import { IBulletin } from '../../../Interfaces/bulletin';
import { BulletinService } from 'src/app/Services/bulletin.service';
import * as moment from 'moment';

@Component({
  selector: 'app-bulletin-edit',
  templateUrl: './bulletin-edit.component.html',
  styleUrls: ['./bulletin-edit.component.css']
})
export class BulletinEditComponent implements OnInit {
  userName: string;

  id: string;
  submitted = false;
  isNew = true;

  bulletinForm: FormGroup = this.createForm({
    _id: '',
    bulletin_number: '',
    title: '',
    type: '',
    date_created: '',
    created_by: '',
    isActive: true,
    bulletinURL: ''
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private common: CommonService,
    private auth: AuthService,
    private bs: BulletinService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.common.setPageTitle(data.title);
      this.auth.currentUser.subscribe(user => {
        this.userName = user.firstName + ' ' + user.lastName;
      });
    });

    this.bulletinForm.controls.bulletin_number.setValidators(Validators.required);
    this.bulletinForm.controls.title.setValidators(Validators.required);
    this.bulletinForm.controls.created_by.setValidators(Validators.required);
    this.bulletinForm.controls.date_created.setValidators(Validators.required);


    if (this.route.snapshot.paramMap.has('id')) {
      this.isNew = false;
      this.id = this.route.snapshot.paramMap.get('id');

      this.bs.getBulletin(this.id).subscribe(data => {
        data.date_created = moment(data.date_created).format('YYYY-MM-DD');
        this.updateForm(data);
      });
    } else {
      this.bulletinForm.controls.created_by.setValue(this.userName);
      this.bulletinForm.controls.date_created.setValue(moment().format('YYYY-MM-DD'));
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.bulletinForm.invalid) {
      return;
    }

    this.bulletinForm.removeControl('_id');
    const formValues = this.bulletinForm.value;

    if (this.id) {
      this.bs.updateBulletin(this.id, formValues)
      .subscribe(data => {
        this.common.showMessage(data.message, data.alert);
        this.redirect();
      });
    } else {
      this.bs.createBulletin(formValues)
      .subscribe(data => {
        this.common.showMessage(data.message, data.alert);
        this.redirect();
      });
    }


  }

  private redirect(): void {
    // this.location.back();
    this.router.navigate(['/bulletins']);
  }
  private createForm(model: IBulletin): FormGroup {
    return this.fb.group(model);
  }

  private updateForm(model: Partial<IBulletin>): void {
    this.bulletinForm.patchValue(model);
  }

  get f() {
    return this.bulletinForm.controls;
  }
}
