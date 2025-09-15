import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee-service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { EmployeeModel } from '../model/employeemodel';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  const mockEmployee: EmployeeModel = {
      employeeName: "Wasi Haider",
      employeeTitle: "Marketing",
      location: "Delhi India",
      employeeType: "full-time",
      startDate: "2025-08-01T18:30:00.000Z",
      endDate: "2025-08-30T18:30:00.000Z",
      id: "myxK2MHl2EnMA4j6"
    };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmployeeService,
        provideHttpClientTesting() // Angular 20+ preferred way
      ]
    });
    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an employee', () => {
    service.addEmployee(mockEmployee).subscribe(res => {
      expect(res).toEqual(mockEmployee);
    });

    const req = httpMock.expectOne(service.baseUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockEmployee);
  });
});
