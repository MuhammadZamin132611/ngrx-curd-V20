import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeModel } from '../model/employeemodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  protected readonly baseUrl: string = 'http://localhost:3000/employee';

  constructor(private http: HttpClient) { }

  addEmployee(employee: EmployeeModel): Observable<EmployeeModel> {
    return this.http.post<EmployeeModel>(this.baseUrl, employee)
  }

  getAllEmployee(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(this.baseUrl);
  }

}
