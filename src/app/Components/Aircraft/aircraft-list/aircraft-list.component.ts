import { Component, OnInit, OnChanges } from '@angular/core';
import { AircraftService } from '../../../Services/aircraft.service';
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

export class AircraftListComponent implements OnInit, OnChanges {

  aircraftList = new Array<Aircraft>();
  aircraft: Aircraft;

  issuesList = new Array<Issue>();
  tailSelected: string;

  constructor(
    private aircraftService: AircraftService,
    private issueService: IssueService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.setTitle();
    this.loadAircrafts();
  }

  ngOnChanges() {
    console.log('on Changes fired');
  }

  private loadAircrafts(): void {
    this.aircraftList.length = 0;

    this.aircraftService.getAircrafts()
    .subscribe(data => {
      data.forEach((aircraft: Aircraft) => {
        if (this.aircraftList.indexOf(aircraft) === -1) {
          this.aircraftList.push(aircraft);
        }
      });
    });
  }

  private loadTab(tail: string): void {
    this.issuesList.length = 0;

    if (tail !== '') {
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

  aircraftClicked(id: string):void {
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
