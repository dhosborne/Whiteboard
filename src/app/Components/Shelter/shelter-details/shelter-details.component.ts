import { Component, OnInit } from '@angular/core';
import { ShelterService } from '../../../Services/shelter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Shelter } from '../../../Classes/shelter';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-shelter-details',
  templateUrl: './shelter-details.component.html',
  styleUrls: ['./shelter-details.component.css']
})
export class ShelterDetailsComponent implements OnInit {
  shelterList = new Array<Shelter>();

  constructor(
    private shelterService: ShelterService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.setTitle();
  }

  private setTitle(): void {
    this.route.data.subscribe(data => {
      this.title.setTitle(data.title);
    });
  }
}
