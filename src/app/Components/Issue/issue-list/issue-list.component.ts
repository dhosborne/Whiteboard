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

  constructor(
    private issueService: IssueService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.getIssues();
    this.setTitle();
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

  private setTitle(): void {
    this.route.data.subscribe(data => {
      this.title.setTitle(data.title);
    });
  }

  toggle(element: HTMLElement, icon: HTMLElement): void {
    element.classList.toggle('d-none');

    if (icon.innerText === 'expand_more') {
      icon.innerText = 'chevron_left';
    } else {
      icon.innerText = 'expand_more';
    }
  }
}
