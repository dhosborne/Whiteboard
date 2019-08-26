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
import { nextTick } from 'q';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  aircraftList = new Array<Aircraft>();
  shelterList = new Array<Shelter>();
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
      data.forEach(element => {
        if (moment(element.reconDate).isSame(moment(), 'week')) {
          if (!this.battsThisWeek) {
            this.battsThisWeek = true;
          }
          this.aircraftList.push(element);
        }
      });
    });
  }

  private getShelterList() {
    this.shelterService.getShelters()
    .subscribe(data => {
      data.forEach(element => {
        this.shelterList.push(element);

        if (moment(element._7Day).isSame(moment(), 'week')) {
          if (!this.shelterInspectionsThisWeek) {
            this.shelterInspectionsThisWeek = true;
          }
        }
        if (moment(element._28Day).isSame(moment(), 'week')) {
          if (!this.shelterInspectionsThisWeek) {
            this.shelterInspectionsThisWeek = true;
          }
        }
        if (moment(element._64Day).isSame(moment(), 'week')) {
          if (!this.shelterInspectionsThisWeek) {
            this.shelterInspectionsThisWeek = true;
          }
        }
        if (moment(element._168Day).isSame(moment(), 'week')) {
          if (!this.shelterInspectionsThisWeek) {
            this.shelterInspectionsThisWeek = true;
          }
        }
        if (moment(element._7Day).isSame(moment(), 'week')) {
          if (!this.shelterInspectionsThisWeek) {
            this.shelterInspectionsThisWeek = true;
          }
        }
        if (moment(element.airFilters).isSame(moment(), 'week')) {
          if (!this.shelterInspectionsThisWeek) {
            this.shelterInspectionsThisWeek = true;
          }
        }
      });
    });
  }

  public avClicked(id): void {
    this.router.navigate(['aircraft/' + id + '/edit']);
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
