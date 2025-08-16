import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../Material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee-service';
import { EmployeeModel } from '../../model/employeemodel';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { selectEmployeeById, selectEmployeesLoading } from '../../../store/employees/employees.selectors';
import * as EmployeeActions from '../../../store/employees/employees.actions';

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
  loading$: any;

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private store: Store
  ) {
    this.editEmployeeForm = this.fb.group({
      employeeName: ['', Validators.required],
      employeeTitle: ['', Validators.required],
      location: ['', Validators.required],
      employeeType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
    this.loading$ = this.store.select(selectEmployeesLoading)
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.store.select(selectEmployeeById(this.id)).subscribe(emp => {
            if (!emp) {
              this.store.dispatch(EmployeeActions.loadEmployees());
            } else {
              this.employeeData = emp;
              this.editEmployeeForm.patchValue({
                employeeName: emp.employeeName,
                employeeTitle: emp.employeeTitle,
                location: emp.location,
                employeeType: emp.employeeType,
                startDate: emp.startDate,
                endDate: emp.endDate
              });

            }
          })
        }
      }
    });
  }

  submitForm() {
    if (this.editEmployeeForm.valid) {
      this.store.dispatch(EmployeeActions.updateEmployee({
        id: this.id,
        changes: this.editEmployeeForm.value
      }))
      this.router.navigate(['/employee']);
      this.toastr.success('Updated Successfully', 'Employee Updated');
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