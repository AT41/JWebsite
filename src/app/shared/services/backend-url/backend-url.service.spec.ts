import { TestBed } from '@angular/core/testing';

import { BackendUrlService } from './backend-url.service';

describe('BackendUrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackendUrlService = TestBed.get(BackendUrlService);
    expect(service).toBeTruthy();
  });
});
