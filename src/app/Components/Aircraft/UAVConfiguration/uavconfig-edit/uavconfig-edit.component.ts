import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import { CommonService } from '../../../../Services/common.service';
import { IUavConfig } from '../../../../Interfaces/uavconfig';
import { Aircraft } from 'src/app/Classes/aircraft';
import { AircraftService } from 'src/app/Services/aircraft.service';
import { UavconfigService } from 'src/app/Services/uavconfig.service';

@Component({
  selector: 'app-uavconfig-edit',
  templateUrl: './uavconfig-edit.component.html',
  styleUrls: ['./uavconfig-edit.component.css']
})
export class UavconfigEditComponent implements OnInit {
  uavConfigForm: FormGroup = this.createForm({
    _id: '',
    asset: '',
    electrical: '',
    transponder: '',
    transpondermodel: '',
    eoir: '',
    radartype: '',
    network: '',
    rftray: '',
    videoencodertype: '',
    audiomixer: '',
    arc210: '',
    lostlink: '',
    saa: '',
    tcas: '',
    airtoair: '',
    dualarc210: '',
    enc1hd: '',
    priblos: '',
    secblos: '',
    laseralt: '',
    wspm: '',
    ais: '',
    harvester: '',
    cbanddiplex: '',
    belongsTo: ''
  });

  id: string;
  submitted = false;
  isNew = true;
  aircraft: Aircraft;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private common: CommonService,
    private as: AircraftService,
    private us: UavconfigService,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.common.setPageTitle(data.title);
    });

    // get the aircraft id
    this.id = this.route.snapshot.paramMap.get('id');


    if (this.id) {
      this.as.getAircraft(this.id)
      .subscribe(av => {
        // update aircraft
        this.setAircraft(av);

        // check for a uav config in the db,
        // update the form or set it as new

        this.us.getConfiguration(this.aircraft._id)
        .subscribe(conf => {
          if (conf.results) {
            this.isNew = false;
            this.updateForm(conf.results);
          } else {
            // remove the CBP intitals from the tail number
            const substr = this.aircraft.tailNumber
            .substring(3, this.aircraft.tailNumber.length);

            // update form with default values
            this.uavConfigForm.patchValue({
              asset: substr,
              lostlink: '96'
            });

          }
        });
      });
    }
  }



  onSubmit(): void {

    this.submitted = true;
    if (this.uavConfigForm.invalid) {
      return;
    }

    // remove the id from the interface
    this.uavConfigForm.removeControl('_id');

    // store form values
    const formValues = this.uavConfigForm.value;

    if (this.isNew) {
      // add aircraft id to the form if new
      this.uavConfigForm.patchValue({belongsTo: this.id});
      this.us.createConfiguration(formValues)
      .subscribe(data => {
        this.common.showMessage(data.message, data.level);
      });
      this.location.back();
    } else {
      this.us.updateConfiguration(this.id, formValues)
      .subscribe(data => {
        this.common.showMessage(data.message, data.level);
        this.location.back();
      });
    }

  }

  onDelete(): void {
    this.us.deleteConfiguration(this.id)
    .subscribe(data => {
      this.common.showMessage(data.message, data.alert);
    });
    this.redirect();
  }

  onCancel(): void {
    this.location.back();
  }

  redirect(): void {
    this.router.navigate(['/aircrafts']);
  }

  private createForm(model: IUavConfig): FormGroup {
    return this.fb.group(model);
  }

  private updateForm(model: Partial<IUavConfig>): void {
    this.uavConfigForm.patchValue(model);
  }
  private setAircraft(aircraft: Aircraft): void {
    this.aircraft = aircraft;
  }
  get f() {
    return this.uavConfigForm.controls;
  }
}
