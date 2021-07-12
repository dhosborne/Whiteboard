import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UavconfigDetailsComponent } from './uavconfig-details.component';

describe('UavconfigDetailsComponent', () => {
  let component: UavconfigDetailsComponent;
  let fixture: ComponentFixture<UavconfigDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UavconfigDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UavconfigDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
