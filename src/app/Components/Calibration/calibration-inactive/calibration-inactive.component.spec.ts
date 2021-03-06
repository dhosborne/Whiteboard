import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CalibrationInactiveComponent } from './calibration-inactive.component';

describe('CalibrationInactiveComponent', () => {
  let component: CalibrationInactiveComponent;
  let fixture: ComponentFixture<CalibrationInactiveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CalibrationInactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
