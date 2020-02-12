import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinEditComponent } from './bulletin-edit.component';

describe('BulletinEditComponent', () => {
  let component: BulletinEditComponent;
  let fixture: ComponentFixture<BulletinEditComponent>;

  beforeEach(async(() => {
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
