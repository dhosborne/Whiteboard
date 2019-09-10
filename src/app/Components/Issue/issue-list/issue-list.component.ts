import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Issue } from '../../../Classes/issue';
import { IssueService } from '../../../Services/issue.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  issuesList = Array<Issue>();
  currentSet = Array<Issue>();
  header: string;

  constructor(
    private issueService: IssueService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.getIssues();
    this.setTitle();
    this.loadTab('open');
  }

  private getIssues(): void {
    this.issuesList.length = 0;

    this.issueService.getIssues()
    .subscribe(data => {
      data.forEach(issue => {
        if (this.issuesList.indexOf(issue) === -1) {
          this.issuesList.push(issue);
        }
      });
    });
  }

  loadTab(status: string): void {
    let state;
    this.header = status;

    if (status === 'closed') {
      state = true;
    } else {
      state = false;
    }

    this.currentSet.length = 0;
    this.issuesList.forEach(issue => {
      if (this.currentSet.indexOf(issue) === -1) {
        if (issue.completed === state) {
          this.currentSet.push(issue);
        }
      }
    });

  }

  issueClicked(id): void {
    this.router.navigate(['issues/' + id + '/details']);
  }

  private setTitle(): void {
    this.route.data.subscribe(data => {
      this.title.setTitle(data.title);
    });
  }
}
