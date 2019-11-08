import { Component, OnInit } from '@angular/core';
import { Aircraft } from '../../Classes/aircraft';
import { Shelter } from '../../Classes/shelter';
import { Calibration } from '../../Classes/calibration';
import { AircraftService } from '../../Services/aircraft.service';
import { ShelterService } from '../../Services/shelter.service';
import { CalibrationService } from '../../Services/calibration.service';
import { CommonService } from '../../Services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  aircraftList = new Array<Aircraft>();
  shelterList = new Array<object>();

  calThisWeekList = new Array<Calibration>();
  calThisMonthList = new Array<Calibration>();
  cal3MonthsList = new Array<Calibration>();

  shelterInspectionsThisWeek = false;

  constructor(
    private aircraftService: AircraftService,
    private shelterService: ShelterService,
    private calService: CalibrationService,
    private router: Router,
    private route: ActivatedRoute,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.setTitle();
    this.getAircraftList();
    this.getShelterList();
    this.getCalibrations();
  }

  private getCalibrations(): void {
    this.calService.getCalibrations()
    .subscribe(data => {
      data.forEach(element => {
        const dueDate = moment(this.common.calculateDueDate(element.date, element.duration, 'months'));

        if (this.common.isDueThisWeek(dueDate) && !element.inCal) {
          this.calThisWeekList.push(element);
        }
        if (this.common.isDueThisMonth(dueDate) && !element.inCal) {
          this.calThisMonthList.push(element);
        }

        if (this.common.isDue3Months(dueDate) &&  !element.inCal) {
          this.cal3MonthsList.push(element);
        }
      });
    });
  }

  private setTitle(): void {
    this.route.data.subscribe(data => {
      this.common.setPageTitle(data.title);
    });
  }

  private getAircraftList() {
    this.aircraftService.getAircrafts()
    .subscribe(data => {
      data.forEach((element: Aircraft) => {
        const due = this.common.calculateDueDate(element.reconDate, 28, 'days');

        if (moment(due).isSame(moment.now(), 'week')) {
          this.aircraftList.push(element);
        }
     });
    });
  }

  private getShelterList() {
    this.shelterService.getShelters()
    .subscribe(data => {
      data.forEach((element: Shelter) => {
        const _7dayDue = this.common.calculateDueDate(element._7Day, 7, 'days');
        const _28dayDue = this.common.calculateDueDate(element._28Day, 28, 'days');
        const _84dayDue = this.common.calculateDueDate(element._84Day, 84, 'days');
        const _168dayDue = this.common.calculateDueDate(element._168Day, 168, 'days');
        const airFilters = this.common.calculateDueDate(element.airFilters, 90, 'days');

        const list = {
          _id: element._id,
          name: element.name,
          inspectionsCount: 0,
        };

        if (this.common.isDueThisWeek(_7dayDue)) {
          list.inspectionsCount++;
        }
        if (this.common.isDueThisWeek(_28dayDue)) {
          list.inspectionsCount++;
        }
        if (this.common.isDueThisWeek(_84dayDue)) {
          list.inspectionsCount++;
        }
        if (this.common.isDueThisWeek(_168dayDue)) {
          list.inspectionsCount++;
        }
        if (this.common.isDueThisWeek(airFilters)) {
          list.inspectionsCount++;
        }

        if (list.inspectionsCount > 0 ) {
          this.shelterList.push(list);
        }

      });

      if (this.shelterList.length > 0) {
        this.shelterInspectionsThisWeek = true;
      }
    });
  }

  public avClicked(id): void {
    this.router.navigate(['aircrafts/' + id + '/edit']);
  }
  public calClicked(id): void {
    this.router.navigate(['calibrations/' + id + '/edit']);
  }
  public shelterClicked(id): void {
    this.router.navigate(['shelters/' + id + '/edit']);
  }

  toggle(element: HTMLElement, icon: HTMLElement): void {
    element.classList.toggle('d-none');

    if (icon.innerText === 'expand_more') {
      icon.innerText = 'chevron_left';
    } else {
      icon.innerText = 'expand_more';
    }
  }
}
