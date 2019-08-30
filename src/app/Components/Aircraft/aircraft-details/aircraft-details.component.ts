import { Component, OnInit } from '@angular/core';
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
    this.id = this.route.snapshot.paramMap.get('id');

    this.aircraftService.getAircraft(this.id)
    .subscribe(data => {
      this.aircraft = data;

      this.issueService.getIssueGroup(this.aircraft.tailNumber)
        .subscribe(issues => {
            issues.forEach(element => {
              this.issuesList.push(element);
            });
          });
    });
  }

  private setTitle(): void {
    this.route.data.subscribe(data => {
      this.title.setTitle(data.title);
    });
  }

  onEditClick(): void {
    this.router.navigate(['/aircrafts/' + this.id + '/edit']);
  }

}
