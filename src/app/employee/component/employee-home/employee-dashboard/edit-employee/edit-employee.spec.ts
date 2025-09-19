import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployee } from './edit-employee';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { loadEmployees, updateEmployee } from '../../../../../store/employees/employees.actions';
import { EmployeeModel } from '../../../../model/employeemodel';

describe('EditEmployee', () => {
  let component: EditEmployee;
  let fixture: ComponentFixture<EditEmployee>;

  let toastrService: jasmine.SpyObj<ToastrService>;
  let router: jasmine.SpyObj<Router>;
  let store: MockStore;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [EditEmployee],
      providers: [
        { provide: ToastrService, useValue: toastrSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => '123' }) // mock id param
          }
        },
        provideMockStore(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditEmployee);
    component = fixture.componentInstance;

    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    store = TestBed.inject(MockStore);
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form shoulb be valid initially', () => {
    expect(component.editEmployeeForm.valid).toBeFalse();
  });

  it('should mark form as touched when invalid submit', () => {
    spyOn(store, 'dispatch');
    spyOn(component.editEmployeeForm, 'markAllAsTouched');
    component.submitForm();

    expect(store.dispatch).not.toHaveBeenCalled();
    expect(component.editEmployeeForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should dispatch updateEmployee, navigate and show toastr on valid form', () => {
    spyOn(store, 'dispatch');

    component.id = '123';
    component.editEmployeeForm.setValue({
      employeeName: 'Alice',
      employeeTitle: 'Engineer',
      location: 'London',
      employeeType: 'full-time',
      startDate: '2025-09-01',
      endDate: '2025-09-30'
    });

    component.submitForm();

    expect(store.dispatch).toHaveBeenCalledWith(
      updateEmployee({
        id: '123',
        changes: {
          employeeName: 'Alice',
          employeeTitle: 'Engineer',
          location: 'London',
          employeeType: 'full-time',
          startDate: '2025-09-01',
          endDate: '2025-09-30'
        }
      })
    );

    expect(router.navigate).toHaveBeenCalledWith(['/employee']);
    expect(toastrService.success).toHaveBeenCalledWith(
      'Updated Successfully',
      'Employee Updated'
    );
  });

  it('should patch form when employee found', () => {
    const mockEmployee: EmployeeModel = {
      id: '123',
      employeeName: 'Alice',
      employeeTitle: 'Engineer',
      location: 'London',
      employeeType: 'full-time',
      startDate: '2025-09-01',
      endDate: '2025-09-30'
    };

    store.setState({
      employees: {
        employees: [mockEmployee],
        loading: false
      }
    });

    component.ngOnInit();

    expect(component.editEmployeeForm.value).toEqual({
      employeeName: 'Alice',
      employeeTitle: 'Engineer',
      location: 'London',
      employeeType: 'full-time',
      startDate: '2025-09-01',
      endDate: '2025-09-30'
    });
  });

  it('should dispatch loadEmployees when employee not found', () => {
    spyOn(store, 'dispatch');

    // Store state has NO employees
    store.setState({
      employees: {
        employees: [],
        loading: false
      }
    });

    component.id = '123';
    component.ngOnInit();
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(loadEmployees());
  });



});
