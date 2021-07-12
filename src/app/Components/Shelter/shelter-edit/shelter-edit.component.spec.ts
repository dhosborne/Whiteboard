import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShelterEditComponent } from './shelter-edit.component';

describe('ShelterEditComponent', () => {
  let component: ShelterEditComponent;
  let fixture: ComponentFixture<ShelterEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
