import { Component } from '@angular/core';
import { MaterialModule } from '../../../../Material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { EmployeeModel } from '../../../model/employeemodel';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addEmployee } from '../../../../store/employees/employees.actions';

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

  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router, private store: Store) {
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
      this.store.dispatch(addEmployee({ employees: _employeeObj }));
      this.router.navigateByUrl('/employee');
      this.toastr.success('Added Successfully', 'Employee Added');
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
