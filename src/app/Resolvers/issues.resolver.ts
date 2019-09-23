import { Injectable } from '@angular/core';
import { IssueService } from '../Services/issue.service';
import { Resolve } from '@angular/router';


@Injectable()
export class IssuesResolver implements Resolve<any> {
    constructor(private issueService: IssueService) {}
    resolve() {
        return this.issueService.getIssues();
    }
}
