import { Component, OnInit} from '@angular/core';
import { Shelter } from '../../../Classes/shelter';
import { Issue } from '../../../Classes/issue';
import { Router, ActivatedRoute } from '@angular/router';
import { IssueService } from '../../../Services/issue.service';
import { CommonService } from '../../../Services/common.service';

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
    private router: Router,
    private issueService: IssueService,
    private route: ActivatedRoute,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.setTitle();
    this.shelterList = this.route.snapshot.data.shelters;
    this.loadTab(this.shelterList[0].name);
  }

  private loadTab(name: string): void {
    this.issuesList.length = 0;
    if (name !== '') {
      this.nameSelected = name;
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

  shelterClicked(id: string): void {
    this.router.navigate(['shelters/' + id + '/edit']);
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
      this.common.setPageTitle(data.title);
    });
  }

}
