import { IShelter } from '../Interfaces/shelter';

export class Shelter implements IShelter {
    name: string;
    _7Day: string;
    _28Day: string;
    _84Day: string;
    _168Day: string;
    airFilters: string;
    isActive: boolean;

    public toggleIsActive(): void {
        this.isActive = !this.isActive;
    }
}

