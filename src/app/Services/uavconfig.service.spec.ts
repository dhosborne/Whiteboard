import { TestBed } from '@angular/core/testing';

import { UavconfigService } from './uavconfig.service';

describe('UavconfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UavconfigService = TestBed.get(UavconfigService);
    expect(service).toBeTruthy();
  });
});
