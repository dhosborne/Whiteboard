import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { ShelterService } from '../../../Services/shelter.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { IShelter } from 'src/app/Interfaces/shelter';
import * as moment from 'moment';

@Component({
  selector: 'app-shelter-edit',
  templateUrl: './shelter-edit.component.html',
  styleUrls: ['./shelter-edit.component.css']
})
export class ShelterEditComponent implements OnInit {
  shelterForm: FormGroup = this.createForm({
    name: '',
    _7Day: '',
    _28Day: '',
    _84Day: '',
    _168Day: '',
    airFilters: '',
    isActive: false
  });

  id: string;
  submitted = false;
  isNew = true;

  constructor(
    private _shelterService: ShelterService,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _flash: NgFlashMessageService
  ) { }

  ngOnInit() {
    this.shelterForm.controls.name.setValidators(Validators.required);

    if(this._route.snapshot.paramMap.has('id')){
      this.isNew = false;
      this.id = this._route.snapshot.paramMap.get('id');

      this._shelterService.getShelter(this.id)
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
    return this._fb.group(model);
  }

  private updateForm(model: Partial<IShelter>): void {
    this.shelterForm.patchValue(model);
  }

  onSubmit() {
    this.submitted = false;
    const formValues = this.shelterForm.value;
    console.log(formValues);

    if (this._route.snapshot.paramMap.has('id')){
      this._shelterService.updateShelter(this._route.snapshot.paramMap.get('id'),
      formValues)
      .subscribe(data => {
        this.showMessage(data.message);
        this.redirect();
      });
    } else {
      this._shelterService.createShelter(formValues)
      .subscribe(data => {
        this.showMessage(data.message);
        this.redirect();
      });
    }
  }

  onDelete(): void {
    this._shelterService.deleteShelter(this._route.snapshot.paramMap.get('id'))
    .subscribe(data => {
      this.showMessage(data.message);
      this.redirect();
    });
  }

  onCancel(): void {
    this.redirect();
  }

  private redirect(): void {
    this._router.navigate(['shelters'], {});
  }

  private showMessage(message): void {
    this._flash.showFlashMessage({
        messages: [message],
        dismissible: true,
        timeout: 10000,
        type: 'info'
    });
  }

  get f() {
    return this.shelterForm.controls;
  }
}
