import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Aircraft } from '../../../Classes/aircraft';
import { AircraftService } from '../../../Services/aircraft.service';
import { ShelterService } from '../../../Services/shelter.service';
import { IssueService } from '../../../Services/issue.service';
import { Shelter } from '../../../Classes/shelter';
import { IIssue } from '../../../Interfaces/issue';
import * as moment from 'moment';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css']
})
export class IssueEditComponent implements OnInit {

  shelterList = new Array<Shelter>();
  aircraftList = new Array<Aircraft>();
  assetList = new Array<string>();


  id: string;
  submitted = false;
  isNew = true;

  issueForm: FormGroup = this.createForm({
    title: '',
    date: '',
    description: '',
    asset: '',
    createdBy: '',
    completed: false,
  });

  constructor(
    private aircraftService: AircraftService,
    private shelterService: ShelterService,
    private issueService: IssueService,
    private route: ActivatedRoute,
    private router: Router,
    private flash: NgFlashMessageService,
    private fb: FormBuilder,

  ) { }

  ngOnInit() {
    this.loadLists();
    this.issueForm.controls.title.setValidators(Validators.required);
    this.issueForm.controls.date.setValidators(Validators.required);
    this.issueForm.controls.asset.setValidators(Validators.required);
    this.issueForm.controls.createdBy.setValidators(Validators.required);

    if (this.route.snapshot.paramMap.has('id')) {
      this.isNew = false;
      this.id = this.route.snapshot.paramMap.get('id');

      this.issueService.getIssue(this.id)
      .subscribe(data => {
        if (data) {
          this.updateForm(data);
        }
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    console.log('Submit fired');

    if (this.issueForm.invalid) {
      console.log('Form invalid');
      return;
    }

    const formValues = this.issueForm.value;

    if ( this.route.snapshot.paramMap.has('id')) {
      this.issueService.updateIssue(this.route.snapshot.paramMap.get('id'), formValues)
      .subscribe(data => {
        if (data) {
          data.date = moment(data.date).format('YYYY-MM-DD');
          this.updateForm(data);
        }
      });
    } else {
      this.issueService.createIssue(formValues)
      .subscribe(data => {
        this.showMessage(data.message);
        this.redirect();
      });
    }
  }

  private loadLists(): void {
    this.loadAircraft();
    this.loadShelters();
    this.assetList.push('---', 'OTHER');
  }
  private loadShelters(): void {
    this.shelterService.getShelters()
    .subscribe(data => {
      data.forEach(element => {
        this.shelterList.push(element);
        this.aircraftList.push(element.name);
      });
    });
  }

  private loadAircraft(): void {
    this.aircraftService.getAircrafts()
    .subscribe(data => {
      data.forEach(element => {
        this.aircraftList.push(element);
        this.assetList.push(element.tailNumber);
      });
    });
  }

  private createForm(model: IIssue): FormGroup {
    return this.fb.group(model);
  }

  private updateForm(model: Partial<IIssue>): void {
    this.issueForm.patchValue(model);
  }

  onDelete(): void {
    this.issueService.deleteIssue(this.route.snapshot.paramMap.get('id'))
    .subscribe(data => {
      this.showMessage(data.message);
      this.redirect();
    });
  }

  onCancel(): void {
    this.redirect();
  }

  private showMessage(message): void {
    this.flash.showFlashMessage({
      messages: [message],
      dismissible: true,
      timeout: 10000,
      type: 'info'
    });
  }

  redirect(): void {
    this.router.navigate(['issues/' + this.id + '/details'], {});
  }

  get f() {
    return this.issueForm.controls;
  }
}
