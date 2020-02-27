import { Injectable } from '@angular/core';
import { AircraftService } from '../Services/aircraft.service';
import { Resolve, ActivatedRoute } from '@angular/router';

@Injectable()
export class AircraftResolver implements Resolve<any> {
    constructor(
        private route: ActivatedRoute,
        private aircraftService: AircraftService) {}
    resolve() {
        return this.aircraftService.getAircrafts();
    }
}
