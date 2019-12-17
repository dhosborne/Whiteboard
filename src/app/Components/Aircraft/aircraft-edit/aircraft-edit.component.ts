import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { AircraftService } from '../../../Services/aircraft.service';
import { ActivatedRoute, Router} from '@angular/router';
import { IAircraft } from '../../../Interfaces/aircraft';
import { CommonService } from '../../../Services/common.service';
import { AuthService } from '../../../Services/auth.service';
import * as moment from 'moment';


@Component({
  selector: 'app-aircraft-edit',
  templateUrl: './aircraft-edit.component.html',
  styleUrls: ['./aircraft-edit.component.css']
})
export class AircraftEditComponent implements OnInit {
  aircraftForm: FormGroup = this.createForm({
    _id: '',
    tailNumber: '',
    reconDate: '',
    isActive: true,
    createdBy: '',
    createdOn: '',
    updatedBy: '',
    updatedOn: ''
  });

  id: string;
  submitted = false;
  isNew = true;



  constructor(
    private fb: FormBuilder,
    private aircraftService: AircraftService,
    private route: ActivatedRoute,
    private router: Router,
    private common: CommonService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.common.setPageTitle(data.title);
    });

    this.aircraftForm.controls.tailNumber.setValidators([
      Validators.required,
      Validators.pattern('^(CBP)([0-9]{3})$')
    ]);
    this.aircraftForm.controls.reconDate.setValidators([Validators.required]);

    if (this.route.snapshot.paramMap.has('id')) {
      // an id was in the url, so this is not a new tail
      this.isNew = false;
      this.id = this.route.snapshot.paramMap.get('id');

      this.aircraftService.getAircraft(this.id)
      .subscribe(data => {
        if (data) {
          data.reconDate = moment(data.reconDate).format('YYYY-MM-DD');
          this.updateForm(data);
        }
      });
    }
  }

  private createForm(model: IAircraft ): FormGroup {
    return this.fb.group(model);
  }

  private updateForm(model: Partial<IAircraft>): void {
    this.aircraftForm.patchValue(model);
  }

  onSubmit() {
    this.submitted = true;
    let currentUserName;
    let date = moment(moment.now()).format('YYYY-MM-DD');

    if (this.aircraftForm.invalid) {
      return;
    }

    // get the current user id
    this.auth.currentUser.subscribe(user => {
      currentUserName = user.firstName + ' ' + user.lastName;
    });

    this.aircraftForm.removeControl('_id');
    const formValues = this.aircraftForm.value;
    formValues.updatedBy = currentUserName;
    formValues.updatedOn = date;

    // patch the creation value if not already popluated
    if ( formValues.createdBy === '' || formValues.createdOn === '') {
      formValues.createdBy = currentUserName;
      formValues.createdOn = date;
    }

    if (this.route.snapshot.paramMap.has('id')) {
      this.aircraftService.updateAircraft(this.route.snapshot.paramMap.get('id'),
      formValues)
      .subscribe(data => {
        this.common.showMessage(data.message, data.alert);
        this.redirect();
      });
    } else {

      this.aircraftService.createAircraft(formValues)
      .subscribe(data => {
        this.common.showMessage(data.message, data.alert);
        this.redirect();
      });
    }
  }

  onDelete(): void {

    this.common.verifyDialogResult('Do you really want to delete this Aircraft?')
    .subscribe(result => {
      if (result) {
        this.aircraftService.deleteAircraft(this.route.snapshot.paramMap.get('id'))
        .subscribe(data => {
          this.common.showMessage(data.message, data.alert);
          this.router.navigate(['/aircrafts']);
        });
      } else {
        this.common.showMessage('Cancelled Delete!', 'info');
      }
    });
  }

  onCancel(): void {
    if (this.isNew) {
      this.router.navigate(['/aircrafts']);
    } else {
      this.redirect();
    }
  }

  redirect(): void {
    this.router.navigate(['aircrafts/'], {});
  }

  get f() {
    return this.aircraftForm.controls;
  }
}
