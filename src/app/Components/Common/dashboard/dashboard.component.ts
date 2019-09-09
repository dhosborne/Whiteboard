import { Component, OnInit } from '@angular/core';
import { Aircraft } from '../../../Classes/aircraft';
import { Shelter } from '../../../Classes/shelter';
import { Calibration } from '../../../Classes/calibration';
import { AircraftService } from '../../../Services/aircraft.service';
import { ShelterService } from '../../../Services/shelter.service';
import { CalibrationService } from '../../../Services/calibration.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
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

  battsThisWeek = false;
  shelterInspectionsThisWeek = false;
  calThisWeek = false;
  calThisMonth = false;
  cal3Months = false;


  constructor(
    private aircraftService: AircraftService,
    private shelterService: ShelterService,
    private calService: CalibrationService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
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
        const dueDate = moment(this.calService.calculateDueDate(element.date, element.duration));
        if (moment(dueDate).isSame(moment.now(), 'week')) {
          if (!this.calThisWeek) {
            this.calThisWeek = true;
            this.calThisWeekList.push(element);
            return;
          }
        }
        if (!moment(dueDate).isSame(moment.now(), 'week') && moment(dueDate).isSame(moment.now(), 'month')) {
          if (!this.calThisMonth) {
            this.calThisMonth = true;
            this.calThisMonthList.push(element);
            return;
          }
        }

        const threeMonths = moment(moment.now()).add(3, 'months');
        if (moment(dueDate).isSame(threeMonths, 'month')) {
          if (!this.cal3Months) {
            this.cal3Months = true;
            this.cal3MonthsList.push(element);
            return;
          }
        }
      });
    });
  }

  private setTitle(): void {
    this.route.data.subscribe(data => {
      this.title.setTitle(data.title);
    });
  }

  private getAircraftList() {
    this.aircraftService.getAircrafts()
    .subscribe(data => {
      data.forEach((element: Aircraft) => {
        const due = this.shelterService.calculateDueDate(element.reconDate, 28);

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
        const _7dayDue = this.shelterService.calculateDueDate(element._7Day, 7);
        const _28dayDue = this.shelterService.calculateDueDate(element._28Day, 28);
        const _84dayDue = this.shelterService.calculateDueDate(element._84Day, 84);
        const _168dayDue = this.shelterService.calculateDueDate(element._168Day, 168);
        const airFilters = this.shelterService.calculateDueDate(element.airFilters, 90);

        const list = {
          _id: element._id,
          name: element.name,
          inspectionsCount: 0,
        };

        if (moment(_7dayDue).isSame(moment.now(), 'week')) {
          list.inspectionsCount++;
        }
        if (moment(_28dayDue).isSame(moment.now(), 'week')) {
          list.inspectionsCount++;
        }
        if (moment(_84dayDue).isSame(moment.now(), 'week')) {
          list.inspectionsCount++;
        }
        if (moment(_168dayDue).isSame(moment.now(), 'week')) {
          list.inspectionsCount++;
        }
        if (moment(airFilters).isSame(moment.now(), 'week')) {
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
    this.router.navigate(['calibrations/' + id + '/edit'])
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
