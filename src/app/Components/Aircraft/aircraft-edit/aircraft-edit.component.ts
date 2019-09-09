import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { AircraftService } from '../../../Services/aircraft.service';
import { ActivatedRoute, Router} from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { IAircraft } from '../../../Interfaces/aircraft';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../Common/confirmation-dialog/confirmation-dialog.component';
import * as moment from 'moment';


@Component({
  selector: 'app-aircraft-edit',
  templateUrl: './aircraft-edit.component.html',
  styleUrls: ['./aircraft-edit.component.css']
})
export class AircraftEditComponent implements OnInit {
  aircraftForm: FormGroup = this.createForm({
    tailNumber: '',
    reconDate: '',
    isActive: true
  });

  id: string;
  submitted = false;
  isNew = true;



  constructor(
    private fb: FormBuilder,
    private aircraftService: AircraftService,
    private route: ActivatedRoute,
    private router: Router,
    private flash: NgFlashMessageService,
    private title: Title,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.setTitle();
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

    if (this.aircraftForm.invalid) {
      return;
    }

    const formValues = this.aircraftForm.value;

    if (this.route.snapshot.paramMap.has('id')) {
      this.aircraftService.updateAircraft(this.route.snapshot.paramMap.get('id'),
      formValues)
      .subscribe(data => {
        this.showMessage(data.message);
        this.redirect();
      });
    } else {
      this.aircraftService.createAircraft(formValues)
      .subscribe(data => {
        console.log(data);
        this.id = data.result._id;
        this.showMessage(data.message);
        this.redirect();
      });
    }
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you really want to delete this Aircraft?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.aircraftService.deleteAircraft(this.route.snapshot.paramMap.get('id'))
        .subscribe(data => {
          this.showMessage(data.message);
          this.router.navigate(['/aircrafts']);
        });
      } else {
        this.showMessage('Cancelled Delete!');
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
    this.router.navigate(['aircrafts/' + this.id + '/details'], {});
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
    return this.aircraftForm.controls;
  }

  private setTitle(): void {
    this.route.data.subscribe(data => {
      this.title.setTitle(data.title);
    });
  }
}
