import { Component, OnInit } from '@angular/core';
import { CalibrationService } from '../../../Services/calibration.service';
import { ICalibration } from '../../../Interfaces/calibration';
import * as moment from 'moment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-calibration-edit',
  templateUrl: './calibration-edit.component.html',
  styleUrls: ['./calibration-edit.component.css']
})
export class CalibrationEditComponent implements OnInit {
  calForm: FormGroup = this.createForm({
    name: '',
    serialNumber: '',
    date: '',
    duration: '',
    location: '',
    inCal: false,
    isActive: true,
  });

  id: string;
  isNew = true;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private calService: CalibrationService,
    private route: ActivatedRoute,
    private router: Router,
    private flash: NgFlashMessageService,
    private title: Title
  ) { }

  ngOnInit() {
    this.setTitle();

    if (this.route.snapshot.paramMap.has('id')) {
      this.isNew = false;
      this.id = this.route.snapshot.paramMap.get('id');

      this.calService.getCalibration(this.id)
      .subscribe(data => {
        data.date = moment(data.date).format('YYYY-MM-DD');
        this.updateFrom(data);
      });
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.calForm.invalid) {
      return;
    }

    const formValues = this.calForm.value;

    if (this.id) {
      this.calService.updateCalibration(this.id, formValues)
      .subscribe(data =>{
        this.showMessage(data.message);
        this.redirect();
      });
    } else {
      this.calService.createCalibration(formValues)
      .subscribe(data => {
        this.showMessage(data.message);
        this.redirect();
      });
    }
  }

  onDelete(): void {
    if (this.id) {
      this.calService.deleteCalibration(this.id)
      .subscribe(data => {
        this.showMessage(data.message);
        this.redirect();
      });
    }
  }

  onCancel(): void {
    this.redirect();
  }

  redirect(): void {
    this.router.navigate(['calibration']);
  }

  private createForm(model: ICalibration): FormGroup {
    return this.fb.group(model);
  }

  private updateFrom(model: Partial<ICalibration>): void {
    this.calForm.patchValue(model);
  }

  private showMessage(message): void {
    this.flash.showFlashMessage({
      messages: [message],
      dismissible: true,
      timeout: 10000,
      type: 'info'
    });
  }

  get f() {
    return this.calForm.controls;
  }

  private setTitle(): void {
    this.route.data.subscribe(data => {
      this.title.setTitle(data.title);
    })
  }

}
