import { IAircraft } from '../Interfaces/aircraft';

export class Aircraft implements IAircraft {
    _id: string;
    tailNumber: string;
    reconDate: string;
    isActive: boolean;
}
