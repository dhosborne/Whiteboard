import { ICalibration } from '../Interfaces/calibration';

export class Calibration implements ICalibration {
    name: string;
    serialNumber: string;
    date: string;
    duration: string;
    location: string;
    notes: string;
    inCal: boolean;
    inCalDate: string;
    isActive: boolean;
}
