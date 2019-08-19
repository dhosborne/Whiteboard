import { ILogin } from '../Interfaces/login';

export class Login implements ILogin {
    username: string;
    password: string;
    constructor(
        username: string,
        password: string,
    ) {}
}
