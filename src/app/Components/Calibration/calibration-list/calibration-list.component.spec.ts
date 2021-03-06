import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CalibrationListComponent } from './calibration-list.component';

describe('CalibrationListComponent', () => {
  let component: CalibrationListComponent;
  let fixture: ComponentFixture<CalibrationListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CalibrationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
