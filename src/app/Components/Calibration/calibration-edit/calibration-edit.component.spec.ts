import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationEditComponent } from './calibration-edit.component';

describe('CalibrationEditComponent', () => {
  let component: CalibrationEditComponent;
  let fixture: ComponentFixture<CalibrationEditComponent>;

  beforeEach(async(() => {
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
