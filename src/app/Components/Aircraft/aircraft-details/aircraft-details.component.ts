import { Component, OnInit, Output } from '@angular/core';
import { Aircraft } from '../../../Classes/aircraft';
import { Issue } from '../../../Classes/issue';
import { AircraftService } from '../../../Services/aircraft.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { IssueService } from '../../../Services/issue.service';

@Component({
  selector: 'app-aircraft-details',
  templateUrl: './aircraft-details.component.html',
  styleUrls: ['./aircraft-details.component.css']
})
export class AircraftDetailsComponent implements OnInit {

  issuesList = new Array<Issue>();
  aircraft: Aircraft;
  id: string;


  constructor(
    private route: ActivatedRoute,
    private aircraftService: AircraftService,
    private issueService: IssueService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.setTitle();
    this.getAircraft();
  }

  private getAircraft(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');

      this.aircraftService.getAircraft(this.id)
      .subscribe(data => {
        this.aircraft = data;
        this.getIssues(data.tailNumber);
      });
    }
  }

  private setTitle(): void {
    this.route.data.subscribe(data => {
      this.title.setTitle(data.title);
    });
  }

  private getIssues(tailNumber: string): void {
    this.issueService.getIssueGroup(this.id)
    .subscribe(data => {
      data.forEach(element => {
        this.issuesList.push(element);
      });
    });

  }

  onEditClick(): void {
    this.router.navigate(['/aircraft/' + this.id + '/edit']);
  }

}
