import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Uavconfig } from '../../../../Classes/uavconfig';
import { UavconfigService } from 'src/app/Services/uavconfig.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-uavconfig-details',
  templateUrl: './uavconfig-details.component.html',
  styleUrls: ['./uavconfig-details.component.css']
})
export class UavconfigDetailsComponent implements OnInit {
  id: string;
  config: Uavconfig;

  constructor(
    private common: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private uavcservice: UavconfigService,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.common.setPageTitle(data.title);
    });

    this.id = this.route.snapshot.paramMap.get('id');

    this.uavcservice.getConfiguration(this.id)
    .subscribe(data => {
      this.config = data.results;
      console.log(this.config);
    });
  }

  onEditClick(): void {
    this.router.navigate(['/aircrafts/' + this.id + '/uavconfig/edit']);
  }

  goBack(): void {
    this.location.back();
  }
}
