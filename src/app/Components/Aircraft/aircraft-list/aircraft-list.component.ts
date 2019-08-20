import { Component, OnInit } from '@angular/core';
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

export class AircraftListComponent implements OnInit {

  aircraftList = new Array<Aircraft>();
  issuesList = new Array<Issue>();

  constructor(
    private aircraftService: AircraftService,
    private issueService: IssueService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.setTitle();
    this.loadAircraft();
    this.loadIssues();
  }

  private loadAircraft(): void {
    this.aircraftList.length = 0;
    this.aircraftService.getAircrafts()
    .subscribe(data => {
      data.forEach((element) => {
        this.aircraftList.push(element);
      });
    });
  }

  private loadIssues(): void {
    this.issuesList.length = 0;
    this.issueService.getIssues()
    .subscribe(data => {
      data.forEach(element => {
        this.issuesList.push(element);
      });
    });
  }

  avClicked(id): void {
    this.router.navigate(['aircraft/' + id + '/details']);
  }

  toggle(element: HTMLElement, icon: HTMLElement): void {
    element.classList.toggle('d-none');

    if (icon.innerText === 'expand_more') {
      icon.innerText = 'chevron_left';
    } else {
      icon.innerText = 'expand_more';
    }
  }

  issueClicked(id): void {
    this.router.navigate(['issues/' + id + '/details']);
  }

  private setTitle(): void {
    this.route.data.subscribe(data => {
      this.title.setTitle(data.title);
    });
  }
}
