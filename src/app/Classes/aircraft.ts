import { IAircraft } from '../Interfaces/aircraft';

export class Aircraft implements IAircraft {
    tailNumber: string;
    reconDate: string;
    isActive: boolean;

    constructor(
        tailNumber: string,
        reconDate: string,
        isActive: boolean,
    ) {}
}
