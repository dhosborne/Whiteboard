import { Component, OnInit } from '@angular/core';
import { ShelterService } from '../../../Services/shelter.service';
import { Shelter } from '../../../Classes/shelter';
import { Issue } from '../../../Classes/issue';
import { Router } from '@angular/router';
import { IssueService } from '../../../Services/issue.service';

@Component({
  selector: 'app-shelter-list',
  templateUrl: './shelter-list.component.html',
  styleUrls: ['./shelter-list.component.css']
})
export class ShelterListComponent implements OnInit {
  shelterList = new Array<Shelter>();
  issuesList = new Array<Issue>();

  constructor(
    private shelterService: ShelterService,
    private router: Router,
    private issueService: IssueService
  ) { }

  ngOnInit() {
    this.getShelterList();
    this.getIssueList();
  }


  private getShelterList(): void {
    this.shelterService.getShelters()
    .subscribe(data => {
      data.forEach(element => {
        this.shelterList.push(element);
      });
    });
  }

  private getIssueList(): void {
    this.issueService.getIssues()
    .subscribe(data => {
      data.forEach(element => {
        this.issuesList.push(element);
      });
    });
  }

  shelterClicked(id): void {
    this.router.navigate(['shelters/' + id + '/edit']);
  }

  issueClicked(id): void {
    this.router.navigate(['issues/' + id + '/details']);
  }

  inActiveClicked(): void {
    this.router.navigate(['shelters/inactive']);
  }
}
