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
  shelter: Shelter;
  nameSelected: string;
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
  }


  private getShelterList(): void {
    this.shelterList.length = 0;

    this.shelterService.getShelters()
    .subscribe(data => {
      data.forEach((shelter: Shelter) => {
        if (this.shelterList.indexOf(shelter) === -1) {
          this.shelterList.push(shelter);
        }
      });
    });
  }

  private loadTab(name: string): void {
    this.issuesList.length = 0;
    if (this.nameSelected !== '') {
      this.shelterList.forEach((element: Shelter) => {
        if (element.name === name) {
          this.shelter = element;
          this.issueService.getIssueGroup(name)
          .subscribe(data => {
            data.forEach((issue: Issue) => {
              this.issuesList.push(issue);
            });
          });
        }
      });
    }
  }


  issueClicked(id): void {
    this.router.navigate(['issues/' + id + '/details']);
  }

  inActiveClicked(): void {
    this.router.navigate(['shelters/inactive']);
  }

  tabSelected(name: string): void {
    this.loadTab(name);
  }

  private setTitle(): void {
    this.route.data.subscribe(data => {
      this.title.setTitle(data.title);
    });
  }

}
