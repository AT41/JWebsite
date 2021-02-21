import { TestBed } from '@angular/core/testing';

import { EnglishdefinitionService } from './englishdefinition.service';

describe('EnglishdefinitionService', () => {
  let service: EnglishdefinitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnglishdefinitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
