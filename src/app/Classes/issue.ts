import {IIssue} from '../Interfaces/issue';

export class Issue implements IIssue {
    _id: string;
    title: string;
    date: string;
    description: string;
    asset: string;
    createdBy: string;
    completed: boolean;

    constructor(title: string,
                date: string,
                description: string,
                belongsTo: string,
                createdBy: string,
                completed: boolean) {

    }
}
