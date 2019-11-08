import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../Services/common.service';
import { CalibrationService } from '../../../Services/calibration.service';
import { ICalibration } from '../../../Interfaces/calibration';
import * as moment from 'moment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    notes: '',
    inCal: false,
    inCalDate: '',
    isActive: true,
  });

  id: string;
  isNew = true;
  toCal = false;
  submitted = false;

  constructor(
    private common: CommonService,
    private fb: FormBuilder,
    private calService: CalibrationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.common.setPageTitle(data.title);
    });

    if (this.route.snapshot.paramMap.has('id')) {
      this.isNew = false;
      this.id = this.route.snapshot.paramMap.get('id');

      this.calService.getCalibration(this.id)
      .subscribe(data => {
        data.date = moment(data.date).format('YYYY-MM-DD');
        this.updateForm(data);
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
      .subscribe(data => {
        this.common.showMessage(data.message, data.alert);
        this.redirect();
      });
    } else {
      this.calService.createCalibration(formValues)
      .subscribe(data => {
        this.common.showMessage(data.message, data.alert);
        this.redirect();
      });
    }
  }

  onDelete(): void {
    if (this.id) {
      this.common.verifyDialogResult('Do you really want to delete this cal item?')
      .subscribe(result => {
        console.log('result in component: ', result);
        if (result) {
          this.calService.deleteCalibration(this.id)
          .subscribe(data => {
            this.common.showMessage(data.message, data.alert);
            this.redirect();
          });
        } else {
          this.common.showMessage('Item NOT deleted', 'info');
        }
      });
    }
  }

  onCancel(): void {
    this.redirect();
  }

  inCalWasChanged(e): void {
    if (e.target.checked) {
      this.calForm.controls.inCalDate.patchValue(moment(moment.now()).format('YYYY-MM-DD'));
    } else {
      this.calForm.controls.inCalDate.patchValue('');
    }
  }

  redirect(): void {
    this.router.navigate(['calibrations']);
  }

  private createForm(model: ICalibration): FormGroup {
    return this.fb.group(model);
  }

  private updateForm(model: Partial<ICalibration>): void {
    this.calForm.patchValue(model);
  }

  get f() {
    return this.calForm.controls;
  }

}
