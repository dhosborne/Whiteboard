import { Component, OnInit } from '@angular/core';
import { Aircraft } from '../../../Classes/aircraft';
import { AircraftService } from '../../../Services/aircraft.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-aircraft-inactive',
  templateUrl: './aircraft-inactive.component.html',
  styleUrls: ['./aircraft-inactive.component.css']
})
export class AircraftInactiveComponent implements OnInit {
  aircraftList = new Array<Aircraft>();

  constructor(
    private aircraftService: AircraftService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getInactiveAircraft();
  }

  getInactiveAircraft(): void {
    this.aircraftService.getInactive()
      .subscribe(data =>
        this.aircraftList = data
      );
  }

  avOnClick(id): void {
    this.router.navigate(['aircraft/' + id + '/edit']);
  }
}
