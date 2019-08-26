import { Component, OnInit } from '@angular/core';
import { CalibrationService} from '../../../Services/calibration.service';
import { Calibration } from '../../../Classes/calibration';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import * as momemnt from 'moment';


@Component({
  selector: 'app-calibration-list',
  templateUrl: './calibration-list.component.html',
  styleUrls: ['./calibration-list.component.css']
})
export class CalibrationListComponent implements OnInit {
  calList = new Array<Calibration>();
  locations = new Array<string>();

  inCal = false;

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
      data.forEach(element => {
        this.calList.push(element);
        if (this.locations.indexOf(element.location) === -1 ) {
          this.locations.push(element.location);
        }
        if (!this.inCal) {
          if (element.inCal) {
            this.inCal = true;
          }
        }
      });
      this.locations.sort();
    });
  }

  calClicked(id): void {
    this.router.navigate(['calibration/' + id + '/edit']);
  }

  toggle(element: HTMLElement, icon: HTMLElement): void {
    element.classList.toggle('d-none');

    if (icon.innerText === 'expand_more') {
      icon.innerText = 'chevron_left';
    } else {
      icon.innerText = 'expand_more';
    }
  }

  private setTitle(): void {
    this.route.data.subscribe(data => {
      this.title.setTitle(data.title);
    });
  }
}
