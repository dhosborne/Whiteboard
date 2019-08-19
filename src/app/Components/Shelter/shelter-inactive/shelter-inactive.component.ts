import { Component, OnInit } from '@angular/core';
import { ShelterService } from '../../../Services/shelter.service';
import { Router } from '@angular/router';
import { Shelter } from '../../../Classes/shelter';

@Component({
  selector: 'app-shelter-inactive',
  templateUrl: './shelter-inactive.component.html',
  styleUrls: ['./shelter-inactive.component.css']
})
export class ShelterInactiveComponent implements OnInit {
  shelterList = new Array<Shelter>();

  constructor(
    private shelterService: ShelterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getInactiveShelters();
  }

  private getInactiveShelters(): void {
    this.shelterService.getInactive()
    .subscribe(data => {
      data.forEach(element => {
        this.shelterList.push(element);
      });
    });
  }

  shelterOnClick(id): void {
    this.router.navigate(['shelters/' + id + '/edit']);
  }

}
