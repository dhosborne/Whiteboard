import { IUser } from '../Interfaces/user';

export class User implements IUser {
    _id: string;
    firstName: string;
    lastName: string;
    employeeNumber: string;
    email: string;
    shirtSize: string;
    jacketSize: string;
    passportExpires: string;
    duties: [string];
    role: string;

    constructor(id: string,
                firstName: string,
                lastName: string,
                employeeNumber: string,
                email: string) {
        this._id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.employeeNumber = employeeNumber;
        this.email = email;
    }

    public getFullName(): string {
        return this.firstName + ' ' + this.lastName;
    }
}
