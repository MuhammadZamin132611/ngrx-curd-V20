import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee-service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
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
        provideHttpClient(), // ✅ Provides the HttpClient
        provideHttpClientTesting() // ✅ Provides the HttpTestingController
      ]
    });

    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

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

  it('should get all employee', () => {
    service.getAllEmployee().subscribe(res => {
      expect(res).toEqual([mockEmployee]);
    });

    const req = httpMock.expectOne(service.baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush([mockEmployee]);
  });

  it('should get employee by id', () => {
    const id = mockEmployee.id;

    service.getIdByEmployee(id).subscribe((employee) => {
      expect(employee).toEqual([mockEmployee]);
    });

    const req = httpMock.expectOne(`${service.baseUrl}?id=${id}`);
    expect(req.request.method).toBe('GET');
    req.flush([mockEmployee]);
  });

  it('should update an employee', () => {
    const updatedEmployee: EmployeeModel = { ...mockEmployee, employeeName: 'Updated Name' };

    const id = mockEmployee.id;

    service.updateEmployee(id, updatedEmployee).subscribe((employee) => {
      expect(employee).toEqual(updatedEmployee);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedEmployee);
  });

  it('should delete an employee', () => {
    const id = mockEmployee.id;

    service.deleteEmployee(id).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.baseUrl}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ success: 200 });
  })

});