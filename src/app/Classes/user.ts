import { IUser } from '../Interfaces/user';

export class User implements IUser {
    // tslint:disable-next-line: variable-name
    _id: string;
    firstName: string;
    lastName: string;

    constructor(id: string, firstName: string, lastName: string) {
        this._id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public fullName(): string {
        return this.firstName + ' ' + this.lastName;
    }
}
