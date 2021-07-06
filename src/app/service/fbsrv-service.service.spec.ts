import { TestBed } from '@angular/core/testing';

import { FBSrvServiceService } from './fbsrv-service.service';

describe('FBSrvServiceService', () => {
  let service: FBSrvServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FBSrvServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
