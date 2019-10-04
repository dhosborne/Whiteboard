import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../../Services/issue.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Aircraft } from '../../../Classes/aircraft';
import { Issue } from '../../../Classes/issue';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-aircraft-list',
  templateUrl: './aircraft-list.component.html',
  styleUrls: ['./aircraft-list.component.css']
})

export class AircraftListComponent implements OnInit {
  data: any;
  aircraftList = new Array<Aircraft>();
  aircraft: Aircraft;

  issuesList = new Array<Issue>();
  tailSelected: string;

  constructor(
    private issueService: IssueService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.aircraftList = this.route.snapshot.data.aircrafts;
    this.loadTab(this.aircraftList[0].tailNumber);
    this.setTitle();
  }

  private loadTab(tail: string): void {
    this.issuesList.length = 0;
    if (tail !== '') {
      this.tailSelected = tail;
      this.aircraftList.forEach(element => {
        if (element.tailNumber === tail) {
          this.aircraft = element;
          this.issueService.getIssueGroup(tail)
          .subscribe(data => {
            data.forEach((issue: Issue) => {
              this.issuesList.push(issue);
            });
          });
        }
      });
    }
  }

  aircraftClicked(id: string): void {
    this.router.navigate(['aircrafts/' + id + '/edit']);
  }
  issueClicked(id): void {
    this.router.navigate(['issues/' + id + '/details']);
  }

  inActiveClicked(): void {
    this.router.navigate(['aircrafts/inactive']);
  }
  private setTitle(): void {
    this.route.data.subscribe(data => {
      this.title.setTitle(data.title);
    });
  }

  tabSelected(tail: string): void {
    this.loadTab(tail);
  }
}
