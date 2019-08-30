import { Component, OnInit } from '@angular/core';
import { Calibration } from '../../../Classes/calibration';
import { CalibrationService } from '../../../Services/calibration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-calibration-details',
  templateUrl: './calibration-details.component.html',
  styleUrls: ['./calibration-details.component.css']
})
export class CalibrationDetailsComponent implements OnInit {
  calibration: Calibration;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private calibrationService: CalibrationService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
  }

  private getCalibration(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');

      this.calibrationService.getCalibration(this.id)
      .subscribe(data => {
        this.calibration = data;
      });
    }
  }

  private setTitle(): void {
    this.route.data.subscribe(data => {
      this.title.setTitle(data.title);
    });
  }

  onEditClick(): void {
    this.router.navigate(['/calibrations/' + this.id + '/edit']);
  }
}
