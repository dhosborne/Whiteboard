import { ISignup } from '../Interfaces/signup';

export class Signup implements ISignup {
    username: string;
    password: string;
    passConfirm: string;
    firstName: string;
    lastName: string;
    email: string;
    employeeNumber: string;


    constructor(
        username: string,
        password: string,
        passConfirm: string,
        firstName: string,
        lastName: string,
        email: string,
        employeeNumber: string
    ) {}
}
