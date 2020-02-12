import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinInactiveComponent } from './bulletin-inactive.component';

describe('BulletinInactiveComponent', () => {
  let component: BulletinInactiveComponent;
  let fixture: ComponentFixture<BulletinInactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulletinInactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
