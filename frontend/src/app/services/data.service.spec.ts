import { TestBed } from '@angular/core/testing';

import { EmployeeStoreService } from './employeeStore.service';

describe('EmployeeStoreService', () => {
  let service: EmployeeStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
