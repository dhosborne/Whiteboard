import { Component, OnInit } from '@angular/core';
import { Aircraft } from '../../../Classes/aircraft';
import { Shelter } from '../../../Classes/shelter';
import { AircraftService } from '../../../Services/aircraft.service';
import { ShelterService } from '../../../Services/shelter.service';
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
  shelterList = new Array<Shelter>();

  constructor(
    private aircraftService: AircraftService,
    private shelterService: ShelterService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.setTitle();
    this.getAircraftList();
    this.getShelterList();
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
      });
    });
  }

  public avClicked(id): void {
    this.router.navigate(['aircraft/' + id + '/edit']);
  }
}
