import { TestBed } from '@angular/core/testing';

import { LabourServicesService } from './labour-services.service';

describe('LabourServicesService', () => {
  let service: LabourServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabourServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
