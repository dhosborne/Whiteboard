import { Component, OnInit } from '@angular/core';
import { Aircraft } from '../../../Classes/aircraft';
import { AircraftService } from '../../../Services/aircraft.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-aircraft-inactive',
  templateUrl: './aircraft-inactive.component.html',
  styleUrls: ['./aircraft-inactive.component.css']
})
export class AircraftInactiveComponent implements OnInit {
  aircraftList = new Array<Aircraft>();

  constructor(
    private aircraftService: AircraftService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.setTitle();
    this.getInactiveAircraft();
  }

  getInactiveAircraft(): void {
    this.aircraftService.getInactive()
      .subscribe(data =>
        this.aircraftList = data
      );
  }

  avOnClick(id): void {
    this.router.navigate(['aircrafts/' + id + '/edit']);
  }

  private setTitle(): void {
    this.route.data.subscribe(data => {
      this.title.setTitle(data.title);
    });
  }
}
