import { Component } from '@angular/core';
import { MaterialModule } from '../../../Material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee-service';
import { EmployeeModel } from '../../model/employeemodel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-employee',
  imports: [MaterialModule, ReactiveFormsModule, NgClass],
  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.scss'
})
export class EditEmployee {
  editEmployeeForm: FormGroup;

  employees: Employee[] = [
    { value: 'part-time', viewValue: 'Part Time' },
    { value: 'full-time', viewValue: 'Full Time' },
    { value: 'contract', viewValue: 'Contract' },
  ];

  id: string | any

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private empService: EmployeeService,
    private toastr: ToastrService
  ) {
    this.editEmployeeForm = this.fb.group({
      employeeName: ['', Validators.required],
      employeeTitle: ['', Validators.required],
      employeeLocation: ['', Validators.required],
      employeeType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    this.activeRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.empService.getIdByEmployee(this.id).subscribe({
            next: (data: EmployeeModel) => {
              console.log('edit', data);
              this.editEmployeeForm.get('employeeName')?.setValue(data.employeeName || '');
              this.editEmployeeForm.get('employeeTitle')?.setValue(data.employeeTitle || '');
              this.editEmployeeForm.get('employeeLocation')?.setValue(data.location || '');
              this.editEmployeeForm.get('employeeType')?.setValue(data.employeeType || '');
              this.editEmployeeForm.get('startDate')?.setValue(data.startDate ? new Date(data.startDate) : null);
              this.editEmployeeForm.get('endDate')?.setValue(data.endDate ? new Date(data.endDate) : null);
              // this.editEmployeeForm.setValue({
              //   employeeName: data.employeeName || '',
              //   employeeTitle: data.employeeTitle || '',
              //   employeeLocation: data.location || '',
              //   employeeType: data.employeeType || '',
              //   startDate: data.startDate ? new Date(data.startDate) : null,
              //   endDate: data.endDate ? new Date(data.endDate) : null,
              // });
            },
            error: () => {
              this.toastr.error('', 'Failed to fetch Employee');
            }
          });
        }
      }
    });
  }




  submitForm() {
    if (this.editEmployeeForm.valid) {
      console.log('Valid', this.editEmployeeForm.value);
    }
    else {
      this.editEmployeeForm.markAllAsTouched();
      console.log('In Valid', this.editEmployeeForm.value);
    }
  }


}

interface Employee {
  value: string;
  viewValue: string;
}