import { TestBed } from '@angular/core/testing';

import { TestStarterService } from './test-starter.service';

describe('TestStarterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestStarterService = TestBed.get(TestStarterService);
    expect(service).toBeTruthy();
  });
});
