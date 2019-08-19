import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../../Services/issue.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Issue } from '../../../Classes/issue';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.css']
})
export class IssueDetailsComponent implements OnInit {
  issue: Issue;
  id: string;

  constructor(
    private issueService: IssueService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('id')){
      this.id = this.route.snapshot.paramMap.get('id');
      this.issueService.getIssue(this.id)
      .subscribe(data => {
        this.issue = data;
      });
    }
  }

  issueEditClicked(id): void {
    this.router.navigate(['issues/' + id + '/edit']);
  }

}
