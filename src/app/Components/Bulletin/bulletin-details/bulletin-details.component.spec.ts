import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinDetailsComponent } from './bulletin-details.component';

describe('BulletinDetailsComponent', () => {
  let component: BulletinDetailsComponent;
  let fixture: ComponentFixture<BulletinDetailsComponent>;

  beforeEach(async(() => {
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
