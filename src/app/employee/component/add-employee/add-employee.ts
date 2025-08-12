import { Component } from '@angular/core';
import { MaterialModule } from '../../../Material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { EmployeeModel } from '../../model/employeemodel';
import { EmployeeService } from '../../services/employee-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  imports: [MaterialModule, ReactiveFormsModule, NgClass],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.scss'
})
export class AddEmployee {
  protected readonly employeeForm: FormGroup;
  employees: Employee[] = [
    { value: 'part-time', viewValue: 'Part Time' },
    { value: 'full-time', viewValue: 'Full Time' },
    { value: 'contract', viewValue: 'Contract' },
  ];

  constructor(private fb: FormBuilder, private empService: EmployeeService, private toastr: ToastrService, private router: Router) {
    this.employeeForm = this.fb.group({
      employeeName: ['', Validators.required],
      employeeTitle: ['', Validators.required],
      employeeLocation: ['', Validators.required],
      employeeType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  _generateId(length: number = 16): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  submitFrom() {
    if (this.employeeForm.valid) {
      const _employeeObj: EmployeeModel = {
        id: this._generateId(),
        employeeName: this.employeeForm.value.employeeName,
        employeeTitle: this.employeeForm.value.employeeTitle,
        location: this.employeeForm.value.employeeLocation,
        employeeType: this.employeeForm.value.employeeType,
        startDate: this.employeeForm.value.startDate,
        endDate: this.employeeForm.value.endDate,
      }
      this.empService.addEmployee(_employeeObj).subscribe({
        next: () => {
          this.toastr.success('Added Successfully', 'Employee Added');
          this.router.navigateByUrl('/employee');
        },
        error: () => {
          this.toastr.error('Somthing Error', 'Employee not Added');
        }
      })
      console.log('Valid', _employeeObj);
    }
    else {
      console.log('InValid', this.employeeForm.value);
    }
  }
}

interface Employee {
  value: string;
  viewValue: string;
}
