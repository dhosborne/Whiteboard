import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IssueEditComponent } from './issue-edit.component';

describe('IssueEditComponent', () => {
  let component: IssueEditComponent;
  let fixture: ComponentFixture<IssueEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
