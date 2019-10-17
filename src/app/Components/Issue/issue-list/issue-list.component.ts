import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Issue } from '../../../Classes/issue';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  data: any;
  issuesList = Array<Issue>();
  currentSet = Array<Issue>();
  header: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.data = this.route.snapshot.data;
    this.common.setPageTitle(this.data.title);
    this.getIssues();
  }

  private getIssues(): void {
    this.issuesList.length = 0;
    this.data.issues.forEach(issue => {
      if (this.issuesList.indexOf(issue) === -1) {
        this.issuesList.push(issue);
      }
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
}
