import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployee } from './add-employee';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { addEmployee } from '../../../../../store/employees/employees.actions';


describe('AddEmployee', () => {
  let component: AddEmployee;
  let fixture: ComponentFixture<AddEmployee>;

  let toastrService: jasmine.SpyObj<ToastrService>;
  let router: jasmine.SpyObj<Router>;
  let store: MockStore;

  beforeEach(async () => {
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [AddEmployee],
      providers: [
        { provide: ToastrService, useValue: toastrSpy },
        { provide: Router, useValue: routerSpy },
        provideMockStore()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEmployee);
    component = fixture.componentInstance;

    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    store = TestBed.inject(MockStore);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate an ID of given length', () => {
    const id = component._generateId(12);
    expect(id).toBeTruthy();
    expect(id.length).toBe(12);
  });

  it('should not dispatch when form is invalid', () => {
    spyOn(store, 'dispatch');

    component.submitFrom();

    expect(store.dispatch).not.toHaveBeenCalled();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
    expect(toastrService.success).not.toHaveBeenCalled();
  });

  it('should dispatch addEmployee, navigate and show toastr on valid form', () => {
    spyOn(store, 'dispatch');

    component.employeeForm.setValue({
      employeeName: 'Alice',
      employeeTitle: 'Engineer',
      employeeLocation: 'London',
      employeeType: 'full-time',
      startDate: '2025-09-01',
      endDate: '2025-09-30',
    });

    component.submitFrom();

    expect(store.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
      type: addEmployee.type,
      employees: jasmine.objectContaining({
        employeeName: 'Alice',
        employeeTitle: 'Engineer',
        location: 'London',
        employeeType: 'full-time',
      }),
    }));

    expect(router.navigateByUrl).toHaveBeenCalledWith('/employee');
    expect(toastrService.success).toHaveBeenCalledWith('Added Successfully', 'Employee Added');
  })
});
