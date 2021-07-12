import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BulletinEditComponent } from './bulletin-edit.component';

describe('BulletinEditComponent', () => {
  let component: BulletinEditComponent;
  let fixture: ComponentFixture<BulletinEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BulletinEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
