import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../../Services/issue.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Issue } from '../../../Classes/issue';
import { Title } from '@angular/platform-browser';

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
    private router: Router,
    private location: Location,
    private title: Title
  ) { }

  ngOnInit() {
    this.setTitle();

    if (this.route.snapshot.paramMap.has('id')) {
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

  private setTitle(): void {
    this.route.data.subscribe(data => {
      this.title.setTitle(data.title);
    });
  }

  goBack(): void {
    this.router.navigate(['/issues']);
  }
}
