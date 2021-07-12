import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BulletinDetailsComponent } from './bulletin-details.component';

describe('BulletinDetailsComponent', () => {
  let component: BulletinDetailsComponent;
  let fixture: ComponentFixture<BulletinDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BulletinDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
