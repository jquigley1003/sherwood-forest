import { TestBed } from '@angular/core/testing';

import { JrResidentService } from './jr-resident.service';

describe('JrResidentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JrResidentService = TestBed.get(JrResidentService);
    expect(service).toBeTruthy();
  });
});
