import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationDetailsComponent } from './calibration-details.component';

describe('CalibrationDetailsComponent', () => {
  let component: CalibrationDetailsComponent;
  let fixture: ComponentFixture<CalibrationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalibrationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
