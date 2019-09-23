import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../Services/common.service';
import { Calibration } from '../../../Classes/calibration';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-calibration-list',
  templateUrl: './calibration-list.component.html',
  styleUrls: ['./calibration-list.component.css']
})
export class CalibrationListComponent implements OnInit {
  data: any;
  calList = new Array<Calibration>();
  currentSet = new Array<Calibration>();

  locations = new Array<string>();
  selectedLocation: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.data = this.route.snapshot.data;
    this.loadCalLists();
    this.common.setPageTitle(this.data.title);
  }

  private loadCalLists(): void {
    this.calList.length = 0;

    this.data.calList.forEach(tool => {
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

  calClicked(id): void {
    this.router.navigate(['calibrations/' + id + '/details']);
  }

  inActiveClicked(): void {
    this.router.navigate(['/calibrations/inactive']);
  }
}
