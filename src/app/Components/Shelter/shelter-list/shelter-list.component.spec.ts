import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShelterListComponent } from './shelter-list.component';

describe('ShelterListComponent', () => {
  let component: ShelterListComponent;
  let fixture: ComponentFixture<ShelterListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
