import { ILogin } from '../Interfaces/login';

export class Login implements ILogin {
    email: string;
    password: string;
    constructor(
        email: string,
        password: string,
    ) {}
}
