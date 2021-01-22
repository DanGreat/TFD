import { TestBed } from '@angular/core/testing';

import { SharedComponentService } from './shared-component.service';

describe('SharedComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedComponentService = TestBed.get(SharedComponentService);
    expect(service).toBeTruthy();
  });
});
