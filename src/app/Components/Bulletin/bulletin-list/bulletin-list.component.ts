import { Component, OnInit } from '@angular/core';
import { Bulletin } from '../../../Classes/bulletin';
import { CommonService } from 'src/app/Services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BulletinService } from 'src/app/Services/bulletin.service';

@Component({
  selector: 'app-bulletin-list',
  templateUrl: './bulletin-list.component.html',
  styleUrls: ['./bulletin-list.component.css']
})
export class BulletinListComponent implements OnInit {
  bulletinList = new Array<Bulletin>();
  bulletin: Bulletin;


  constructor(
    private common: CommonService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.bulletinList = this.route.snapshot.data.bulletins;

    this.route.data.subscribe(data => {
      this.common.setPageTitle(data.title);
    });
  }

  onBulletinClicked(id: string): void {
    this.router.navigate(['bulletins/' + id + '/detials']);
  }

  inActiveClicked(): void {
    this.router.navigate(['bulletins/inactive']);
  }

}
