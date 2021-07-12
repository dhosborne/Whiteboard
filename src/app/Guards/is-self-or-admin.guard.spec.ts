import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { IsSelfOrAdminGuard } from './is-self-or-admin.guard';

describe('IsSelfOrAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsSelfOrAdminGuard]
    });
  });

  it('should ...', inject([IsSelfOrAdminGuard], (guard: IsSelfOrAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
