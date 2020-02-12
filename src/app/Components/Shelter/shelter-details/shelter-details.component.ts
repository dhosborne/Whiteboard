import { Component, OnInit } from '@angular/core';
import { ShelterService } from '../../../Services/shelter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Shelter } from '../../../Classes/shelter';
import { CommonService } from 'src/app/Services/common.service';
import { IssueService } from 'src/app/Services/issue.service';
import { Issue } from '../../../Classes/issue';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shelter-details',
  templateUrl: './shelter-details.component.html',
  styleUrls: ['./shelter-details.component.css']
})
export class ShelterDetailsComponent implements OnInit {

  issuesList = new Array<Issue>();
  shelter: Shelter;
  id: string;


  constructor(
    private location: Location,
    private shelterService: ShelterService,
    private common: CommonService,
    private issueService: IssueService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.common.setPageTitle(data.title);
    });

    this.shelterService.getShelter(this.route.snapshot.paramMap.get('id'))
    .subscribe(shelter => {
      this.shelter = shelter;
    });

    this.issueService.getIssueGroup(this.shelter.name)
    .subscribe(issues => {
      issues.forEach(element => {
        this.issuesList.push(element);
      });
    });
  }

  onEditClick(): void {
    this.router.navigate(['/shelters/' + this.shelter._id + '/edit']);
  }

  onBackClicked(): void {
    this.location.back();
  }
}
