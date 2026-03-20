import { TestBed } from '@angular/core/testing';

import { WasteManagementService } from './waste-management.service';

describe('WasteManagementService', () => {
  let service: WasteManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WasteManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
