import { TestBed } from '@angular/core/testing';

import { QuestionMarkerService } from './question-marker.service';

describe('QuestionMarkerService', () => {
  let service: QuestionMarkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionMarkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
