import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { ShelterService } from '../../../Services/shelter.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { IShelter } from '../../../Interfaces/shelter';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser';

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

  constructor(
    private shelterService: ShelterService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private flash: NgFlashMessageService,
    private title: Title,
    private location: Location,
  ) { }

  ngOnInit() {
    this.setTitle();
    this.shelterForm.controls.name.setValidators(Validators.required);

    if (this.route.snapshot.paramMap.has('id')){
      this.isNew = false;
      this.id = this.route.snapshot.paramMap.get('id');

      this.shelterService.getShelter(this.id)
      .subscribe(data => {
        console.log(data);
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
    const formValues = this.shelterForm.value;
    console.log(formValues);

    if (this.route.snapshot.paramMap.has('id')){
      this.shelterService.updateShelter(this.route.snapshot.paramMap.get('id'),
      formValues)
      .subscribe(data => {
        this.showMessage(data.message);
        this.redirect();
      });
    } else {
      this.shelterService.createShelter(formValues)
      .subscribe(data => {
        this.showMessage(data.message);
        this.redirect();
      });
    }
  }

  onDelete(): void {
    this.shelterService.deleteShelter(this.route.snapshot.paramMap.get('id'))
    .subscribe(data => {
      this.showMessage(data.message);
      this.redirect();
    });
  }

  onCancel(): void {
    this.location.back();
  }

  private redirect(): void {
    this.router.navigate(['shelters'], {});
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
    return this.shelterForm.controls;
  }

  private setTitle(): void {
    this.route.data.subscribe(data => {
      this.title.setTitle(data.title);
    });
  }
}
