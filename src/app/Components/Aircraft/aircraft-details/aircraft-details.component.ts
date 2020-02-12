import { Component, OnInit } from '@angular/core';
import { Aircraft } from '../../../Classes/aircraft';
import { Issue } from '../../../Classes/issue';
import { AircraftService } from '../../../Services/aircraft.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../../../Services/issue.service';
import { CommonService } from 'src/app/Services/common.service';

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
    private common: CommonService,
    private route: ActivatedRoute,
    private aircraftService: AircraftService,
    private issueService: IssueService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.common.setPageTitle(data.title);
    });

    this.aircraftService.getAircraft(this.route.snapshot.paramMap.get('id'))
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

  onEditClick(): void {
    this.router.navigate(['/aircrafts/' + this.aircraft._id + '/edit']);
  }

}
