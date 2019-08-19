import { Component, OnInit } from '@angular/core';
import { ShelterService } from 'src/app/Services/shelter.service';
import { Shelter } from '../../../Classes/shelter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shelter-list',
  templateUrl: './shelter-list.component.html',
  styleUrls: ['./shelter-list.component.css']
})
export class ShelterListComponent implements OnInit {
  shelterList = new Array<Shelter>();

  constructor(
    private _shelterService: ShelterService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getShelterList();
  }


  private getShelterList() {
    this._shelterService.getShelters()
    .subscribe(data => {
      data.forEach(element => {
        this.shelterList.push(element);
      });
    });
  }

  shelterClicked(id): void {
    this._router.navigate(['shelters/' + id + '/edit']);
  }
}
