import { TestBed } from '@angular/core/testing';

import { ContactMessageService } from './contact-message.service';

describe('ContactMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactMessageService = TestBed.get(ContactMessageService);
    expect(service).toBeTruthy();
  });
});
