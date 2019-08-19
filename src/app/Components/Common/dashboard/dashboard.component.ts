import { Component, OnInit } from '@angular/core';
import { Aircraft } from '../../../Classes/aircraft';
import { AircraftService } from '../../../Services/aircraft.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

const title = 'Dashboard';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  avList = new Array<Aircraft>();

  constructor(
    private _aircraftService: AircraftService,
    private _router: Router,
    private _title: Title
  ) { }

  ngOnInit() {
    this._title.setTitle(title);
    this.getAircraftList();
  }

  private getAircraftList() {
    this._aircraftService.getAircrafts()
    .subscribe(data => {
      data.forEach(element => {
        this.avList.push(element);
      });
    });
  }

  public avClicked(id): void {
    this._router.navigate(['aircraft/' + id + '/edit']);
  }
}
