import { Component, OnInit } from '@angular/core';
import { Calibration } from '../../../Classes/calibration';
import { CalibrationService } from '../../../Services/calibration.service';
import { CommonService} from '../../../Services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-calibration-details',
  templateUrl: './calibration-details.component.html',
  styleUrls: ['./calibration-details.component.css']
})
export class CalibrationDetailsComponent implements OnInit {
  tool: Calibration;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private calibrationService: CalibrationService,
    private router: Router,
    private common: CommonService
  ) { }

  ngOnInit() {
    // set title of page
    this.route.data.subscribe(data => {
      this.common.setPageTitle(data.title);
    });

    // if id exists in route, get tool
    if (this.route.snapshot.paramMap.has('id')) {
        this.id = this.route.snapshot.paramMap.get('id');

        this.calibrationService.getCalibration(this.id).subscribe((tool: Calibration) => {
          this.tool = tool;
        });
      }
  }


  onEditClick(): void {
    this.router.navigate(['/calibrations/' + this.id + '/edit']);
  }
}
