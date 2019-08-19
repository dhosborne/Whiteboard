import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Issue } from '../../../Classes/issue';
import { IssueService } from '../../../Services/issue.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  issuesList = Array<Issue>();

  constructor(
    private issueService: IssueService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getIssues();
  }

  private getIssues(): void {
    this.issueService.getIssues()
    .subscribe(data => {
      this.issuesList = data;
    });
  }

  issueClicked(id): void {
    this.router.navigate(['issues/' + id + '/details']);
  }
}
