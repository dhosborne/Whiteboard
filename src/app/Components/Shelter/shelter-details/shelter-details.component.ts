import { Component, OnInit } from '@angular/core';
import { ShelterService } from '../../../Services/shelter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Shelter } from '../../../Classes/shelter';

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
    private router: Router
  ) { }

  ngOnInit() {
  }

  private getInactiveShelters(): void {
    this.shelterService.getInactive()
    .subscribe(data =>{
      data.forEach(element => {
        this.shelterList.push(element);
      });
    });
  }

  shelterOnClick(id): void {
    this.router.navigate(['shelter/' + id + 'edit']);
  }
}
