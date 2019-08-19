import { Component, OnInit, Output } from '@angular/core';
import { Aircraft } from '../../../Classes/aircraft';
import { AircraftService } from '../../../Services/aircraft.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-aircraft-details',
  templateUrl: './aircraft-details.component.html',
  styleUrls: ['./aircraft-details.component.css']
})
export class AircraftDetailsComponent implements OnInit {

  @Output() aircraft: Aircraft;
  id: string;


  constructor(
    private route: ActivatedRoute,
    private aircraftService: AircraftService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');

      this.aircraftService.getAircraft(this.id)
      .subscribe(data => {
        this.aircraft = data;
      });
    }
  }

  onEditClick(): void {
    console.log('click!');
    this.router.navigate(['/aircraft/' + this.id + '/edit']);
  }

}
