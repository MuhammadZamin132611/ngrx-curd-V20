import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../Material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee-service';
import { EmployeeModel } from '../../model/employeemodel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-employee',
  imports: [MaterialModule, ReactiveFormsModule, NgClass],
  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.scss'
})
export class EditEmployee implements OnInit {
  editEmployeeForm: FormGroup;

  employees: Employee[] = [
    { value: 'part-time', viewValue: 'Part Time' },
    { value: 'full-time', viewValue: 'Full Time' },
    { value: 'contract', viewValue: 'Contract' },
  ];

  id: string | any;
  employeeData!: EmployeeModel;

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
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
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.empService.getIdByEmployee(this.id).subscribe({
            next: (res: EmployeeModel[]) => {
              if (res.length > 0) {
                this.employeeData = res[0];
                this.editEmployeeForm.patchValue({
                  employeeName: this.employeeData.employeeName,
                  employeeTitle: this.employeeData.employeeTitle,
                  employeeLocation: this.employeeData.location,
                  employeeType: this.employeeData.employeeType,
                  startDate: this.employeeData.startDate,
                  endDate: this.employeeData.endDate
                });
              }
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
      this.empService.updateEmployee(this.id, this.editEmployeeForm.value).subscribe({
        next: () => {
          this.router.navigate(['/employee']);
          this.toastr.success('Updated Successfully', 'Employee Updated');
        },
        error: () => {
          this.toastr.error('Something Error', 'Error');
        }
      })
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