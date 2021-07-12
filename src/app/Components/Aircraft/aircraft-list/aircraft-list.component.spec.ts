import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AircraftListComponent } from './aircraft-list.component';

describe('AircraftListComponent', () => {
  let component: AircraftListComponent;
  let fixture: ComponentFixture<AircraftListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AircraftListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
