import { TestBed } from '@angular/core/testing';

import { SupersetService } from './superset.service';

describe('SupersetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupersetService = TestBed.get(SupersetService);
    expect(service).toBeTruthy();
  });
});
