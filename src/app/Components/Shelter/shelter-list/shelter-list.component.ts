import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShelterService } from '../../../Services/shelter.service';
import { Shelter } from '../../../Classes/shelter';
import { Issue } from '../../../Classes/issue';
import { Router, ActivatedRoute } from '@angular/router';
import { IssueService } from '../../../Services/issue.service';
import { Title } from '@angular/platform-browser';

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
    private issueService: IssueService,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.setTitle();
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

  toggle(element: HTMLElement, icon: HTMLElement): void {
    element.classList.toggle('d-none');
    if (icon.innerText === 'expand_more') {
      icon.innerText = 'chevron_left';
    } else {
      icon.innerText = 'expand_more';
    }
  }

  goToIssues(): void {
    this.router.navigate(['/issues']);
  }

  private setTitle(): void {
    this.route.data.subscribe(data => {
      this.title.setTitle(data.title);
    });
  }

}
