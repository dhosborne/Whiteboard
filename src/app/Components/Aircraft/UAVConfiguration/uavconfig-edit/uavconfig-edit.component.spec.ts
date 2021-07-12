import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UavconfigEditComponent } from './uavconfig-edit.component';

describe('UavconfigEditComponent', () => {
  let component: UavconfigEditComponent;
  let fixture: ComponentFixture<UavconfigEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UavconfigEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UavconfigEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
