import { Component, OnInit } from '@angular/core';
import { CalibrationService} from '../../../Services/calibration.service';
import { Calibration } from '../../../Classes/calibration';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-calibration-list',
  templateUrl: './calibration-list.component.html',
  styleUrls: ['./calibration-list.component.css']
})
export class CalibrationListComponent implements OnInit {
  calList = new Array<Calibration>();
  currentSet = new Array<Calibration>();

  locations = new Array<string>();
  selectedLocation: string;

  constructor(
    private calService: CalibrationService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
  ) { }

  ngOnInit() {
    this.setTitle();
    this.loadCalLists();
  }

  private loadCalLists(): void {
    this.calList.length = 0;

    this.calService.getCalibrations()
      .subscribe(data => {
        data.forEach(tool => {
          if (this.locations.indexOf(tool.location) === -1) {
            this.locations.push(tool.location);
          }

          if (this.calList.indexOf(tool) === -1) {
            this.calList.push(tool);
          }
        });
        this.locations.sort();
        this.calList.sort();
        this.tabSelected(this.locations[0]);
      });
  }

  tabSelected(location: string): void {
    this.selectedLocation = location;
    this.currentSet.length = 0;
    if ( this.selectedLocation !== '') {
      this.calList.forEach((tool: Calibration) => {
        if (tool.location === location) {
          this.currentSet.push(tool);
        }
      });
    }
  }

  calibrationDue(date, months): boolean {
    return this.calService.calDue(date, months);
  }

  calClicked(id): void {
    this.router.navigate(['calibrations/' + id + '/details']);
  }

  inActiveClicked(): void {
    this.router.navigate(['/calibrations/inactive']);
  }
  private setTitle(): void {
    this.route.data.subscribe(data => {
      this.title.setTitle(data.title);
    });
  }
}
