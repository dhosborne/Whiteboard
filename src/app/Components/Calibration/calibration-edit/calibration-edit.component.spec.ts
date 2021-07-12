import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CalibrationEditComponent } from './calibration-edit.component';

describe('CalibrationEditComponent', () => {
  let component: CalibrationEditComponent;
  let fixture: ComponentFixture<CalibrationEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CalibrationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
