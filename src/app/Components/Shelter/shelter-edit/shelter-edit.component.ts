import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { ShelterService } from '../../../Services/shelter.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { IShelter } from '../../../Interfaces/shelter';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-shelter-edit',
  templateUrl: './shelter-edit.component.html',
  styleUrls: ['./shelter-edit.component.css']
})
export class ShelterEditComponent implements OnInit {
  shelterForm: FormGroup = this.createForm({
    _id: '',
    name: '',
    _7Day: '',
    _28Day: '',
    _84Day: '',
    _168Day: '',
    airFilters: '',
    isActive: true
  });

  id: string;
  submitted = false;
  isNew = true;
  name: string;

  constructor(
    private shelterService: ShelterService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private flash: NgFlashMessageService,
    private title: Title,
    private location: Location,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.common.setPageTitle(data.title);
    });

    this.shelterForm.controls.name.setValidators([
      Validators.required,
      Validators.minLength(4)
    ]);

    if (this.route.snapshot.paramMap.has('id')) {
      this.isNew = false;
      this.id = this.route.snapshot.paramMap.get('id');

      this.shelterService.getShelter(this.id)
      .subscribe(data => {
        this.name = data.name;
        data._7Day = moment(data._7Day).format('YYYY-MM-DD');
        data._28Day = moment(data._28Day).format('YYYY-MM-DD');
        data._84Day = moment(data._84Day).format('YYYY-MM-DD');
        data._168Day = moment(data._268Day).format('YYYY-MM-DD');
        data.airFilters = moment(data.airFilters).format('YYYY-MM-DD');
        this.updateForm(data);
      });
    }
  }

  private createForm(model: IShelter): FormGroup {
    return this.fb.group(model);
  }

  private updateForm(model: Partial<IShelter>): void {
    this.shelterForm.patchValue(model);
  }

  onSubmit() {
    this.submitted = false;
    this.shelterForm.removeControl('_id');
    const formValues = this.shelterForm.value;

    if (this.route.snapshot.paramMap.has('id')) {
      this.shelterService.updateShelter(this.route.snapshot.paramMap.get('id'),
      formValues)
      .subscribe(data => {
        this.common.showMessage(data.message, data.alert);
        this.redirect();
      });
    } else {
      this.shelterService.createShelter(formValues)
      .subscribe(data => {
        this.common.showMessage(data.message, data.alert);
        this.redirect();
      });
    }
  }

  onDelete(): void {
    this.common.verifyDialogResult('Do you really want to delete this shelter?')
    .subscribe(result => {
      if (result) {
        this.shelterService.deleteShelter(this.route.snapshot.paramMap.get('id'))
        .subscribe(data => {
          this.common.showMessage(data.message, data.alert);
          this.redirect();
        });
      } else {
        this.common.showMessage('Shelter NOT deleted', 'info');
      }
    });
  }

  onCancel(): void {
    this.location.back();
  }

  private redirect(): void {
    this.router.navigate(['shelters'], {});
  }

  get f() {
    return this.shelterForm.controls;
  }
}
