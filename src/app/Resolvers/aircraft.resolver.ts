import { Injectable } from '@angular/core';
import { AircraftService } from '../Services/aircraft.service';
import { Resolve } from '@angular/router';

@Injectable()
export class AircraftResolver implements Resolve<any> {
    constructor(private aircraftService: AircraftService) {}
    resolve() {
        return this.aircraftService.getAircrafts();
    }
}
