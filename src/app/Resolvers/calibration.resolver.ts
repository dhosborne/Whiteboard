import { Injectable } from '@angular/core';
import { CalibrationService } from '../Services/calibration.service';
import { Resolve } from '@angular/router';

@Injectable()
export class CalibrationResolver implements Resolve<any> {
    constructor(private calService: CalibrationService) {}
    resolve() {
        return this.calService.getCalibrations();
    }
}
