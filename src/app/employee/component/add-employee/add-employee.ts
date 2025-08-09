import { Component } from '@angular/core';
import { MaterialModule } from '../../../Material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

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

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      employeeName: ['', Validators.required],
      employeeTitle: ['', Validators.required],
      employeeLocation: ['', Validators.required],
      employeeType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  submitFrom() {
    if (this.employeeForm.valid) {
      console.log('Valid', this.employeeForm.value);
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
