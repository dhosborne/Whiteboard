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

    public getTailNumber(): string {
        return this.tailNumber;
    }
    public setTailNumber(newTail): void {
        this.tailNumber = newTail;
    }

    public getReconDate(): string {
        return this.reconDate;
    }

    public setReconDate(newRecon): void {
        this.reconDate = newRecon;
    }

    public getIsActive(): boolean {
        return this.isActive;
    }
    public toggleIsActive(): void {
        this.isActive = !this.isActive;
    }
}
