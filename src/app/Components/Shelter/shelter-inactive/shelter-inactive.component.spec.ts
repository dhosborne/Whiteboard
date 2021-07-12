import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShelterInactiveComponent } from './shelter-inactive.component';

describe('ShelterInactiveComponent', () => {
  let component: ShelterInactiveComponent;
  let fixture: ComponentFixture<ShelterInactiveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelterInactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
