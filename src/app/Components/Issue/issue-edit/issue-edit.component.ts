import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { Aircraft } from '../../../Classes/aircraft';
import { AircraftService } from '../../../Services/aircraft.service';
import { ShelterService } from '../../../Services/shelter.service';
import { IssueService } from '../../../Services/issue.service';
import { CommonService } from '../../../Services/common.service';
import { Shelter } from '../../../Classes/shelter';
import { IIssue } from '../../../Interfaces/issue';
import * as moment from 'moment';
import { User } from 'src/app/Classes/user';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css']
})
export class IssueEditComponent implements OnInit {

  shelterList = new Array<Shelter>();
  aircraftList = new Array<Aircraft>();
  assetList = new Array<string>();
  user: User;


  id: string;
  submitted = false;
  isNew = true;

  issueForm: FormGroup = this.createForm({
    _id: '',
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
    private fb: FormBuilder,
    private location: Location,
    private common: CommonService

  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.common.setPageTitle(data.title);
    });

    this.loadLists();

    const sessionVar = JSON.parse(sessionStorage.getItem('user'));
    this.user = new User(sessionVar._id, sessionVar.firstName, sessionVar.lastName, null, null);

    this.issueForm.controls.title.setValidators(Validators.required);
    this.issueForm.controls.date.setValidators(Validators.required);
    this.issueForm.controls.asset.setValidators(Validators.required);
    this.issueForm.controls.createdBy.setValidators(Validators.required);
    this.issueForm.controls.createdBy.patchValue(this.user.fullName());

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

    this.issueForm.removeControl('_id');
    const formValues = this.issueForm.value;

    if ( this.route.snapshot.paramMap.has('id')) {
      this.issueService.updateIssue(this.route.snapshot.paramMap.get('id'), formValues)
      .subscribe(data => {
        if (data) {
          data.date = moment(data.date).format('YYYY-MM-DD');
          this.updateForm(data);
          this.redirect(data.result._id);
        }
      });
    } else {
      this.issueService.createIssue(formValues)
      .subscribe(data => {
        console.log(data);
        this.common.showMessage(data.message, data.alert);
        this.redirect(data.result._id);
      });
    }
  }

  private loadLists(): void {
    this.loadAircraft();
    this.loadShelters();
    this.assetList.sort();
    this.assetList.push('OTHER');
  }

  private loadShelters(): void {
    this.shelterService.getShelters()
    .subscribe(data => {
      data.forEach(element => {
        this.shelterList.push(element);
        this.assetList.push(element.name);
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

    this.common.verifyDialogResult('Do you really want to delete this issue?')
    .subscribe(result => {
        if (result) {
          this.issueService.deleteIssue(this.route.snapshot.paramMap.get('id'))
          .subscribe(data => {
            this.common.showMessage(data.message, data.alert);
            this.router.navigate(['/issues']); // issue deleted, go back to list
          });
        } else {
          this.common.showMessage('Cancelled Delete!', 'info');
        }
      });
  }

  onCancel(): void {
    this.location.back();
  }

  redirect(id: string): void {
    this.router.navigate(['issues/' + id + '/details'], {});
  }

  get f() {
    return this.issueForm.controls;
  }
}
