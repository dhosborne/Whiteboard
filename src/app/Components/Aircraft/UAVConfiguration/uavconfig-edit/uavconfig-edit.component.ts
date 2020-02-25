import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { CommonService } from '../../../../Services/common.service';
import { IUavConfig } from '../../../../Interfaces/uavconfig';

@Component({
  selector: 'app-uavconfig-edit',
  templateUrl: './uavconfig-edit.component.html',
  styleUrls: ['./uavconfig-edit.component.css']
})
export class UavconfigEditComponent implements OnInit {
  uavConfigForm: FormGroup = this.createForm({
    asset: '',
    electrical: '',
    transponder: '',
    transpondermodel: '',
    eoir: '',
    radartype: '',
    network: '',
    rftray: '',
    videoencodertype: '',
    audiomixer: '',
    arc210: '',
    lostlink: '',
    saa: '',
    tcas: '',
    airtoair: '',
    dualarc210: '',
    enc1hd: '',
    priblos: '',
    secblos: '',
    laseralt: '',
    wspm: '',
    ais: '',
    harvester: '',
    cbanddiplex: ''
  });

  id: string;
  submitted = false;
  isNew = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private common: CommonService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.common.setPageTitle(data.title);
    });
  }

  private createForm(model: IUavConfig): FormGroup {
    return this.fb.group(model);
  }

  private updateForm(model: Partial<IUavConfig>): void {
    this.uavConfigForm.patchValue(model);
  }

  onSubmit():void {

  }

  onDelete(): void {

  }

  onCancel(): void {

  }

  redirect(): void {
    this.router.navigate(['/aircraft']);
  }

  get f() {
    return this.uavConfigForm.controls;
  }
}
