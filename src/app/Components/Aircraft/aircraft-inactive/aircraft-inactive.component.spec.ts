import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AircraftInactiveComponent } from './aircraft-inactive.component';

describe('AircraftInactiveComponent', () => {
  let component: AircraftInactiveComponent;
  let fixture: ComponentFixture<AircraftInactiveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AircraftInactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
