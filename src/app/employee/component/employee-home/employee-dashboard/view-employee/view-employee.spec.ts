import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmployee } from './view-employee';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ToastrService } from 'ngx-toastr';
import { provideRouter, Router } from '@angular/router';
import { EmployeeModel } from '../../../../model/employeemodel';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { deleteEmployee, loadEmployees } from '../../../../../store/employees/employees.actions';

describe('ViewEmployee', () => {
  let component: ViewEmployee;
  let fixture: ComponentFixture<ViewEmployee>;

  let store: MockStore;
  let toastr: jasmine.SpyObj<ToastrService>;
  let router: Router;

  const mockEmployees: EmployeeModel[] = [
    { id: '1', name: 'John Doe', title: 'Dev', location: 'NY', type: 'Full-time', start: '2025-01-01', end: '2025-12-31' }
  ] as any;

  beforeEach(async () => {
    toastr = jasmine.createSpyObj('ToastrService', ['error', 'success']);
    await TestBed.configureTestingModule({
      imports: [ViewEmployee, MatTableModule, MatPaginatorModule, MatSortModule],
      providers: [
        provideMockStore({
          initialState: {
            employees: { employees: mockEmployees, loading: false }
          }
        }),
        { provide: ToastrService, useValue: toastr },
        provideRouter([])
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(ViewEmployee);
    component = fixture.componentInstance;
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ isAdmin: true }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadEmployee ngOnInit', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(loadEmployees());
  });

  it('should update dataSource when employee$ emits', () => {
    store.overrideSelector('selectAllEmployees', mockEmployees);
    component.ngOnInit();
    expect(component.dataSource.data).toEqual(mockEmployees);
  });

  it('should apply filter on table', () => {
    const event = { target: { value: 'john' } } as unknown as Event;
    component.applyFilter(event);
    expect(component.dataSource.filter).toBe('john');
  });

  it('should route with id', ()=>{
    const id = '123';
    const navigateSpy = spyOn(router, 'navigate');
    component.editEmployee(id);
    expect(navigateSpy).toHaveBeenCalledWith(['dashboard/home/edti-employee', id]);
  })

  it('should not delete if user is not admin', () => {
    (localStorage.getItem as jasmine.Spy).and.rejectWith(JSON.stringify({ isAdmin: false }));
    component.loggedUser = { isAdmin: false };
    component.deleteEmployee('1');
    expect(toastr.error).toHaveBeenCalledWith('You are not authorized to delete employees', 'Access Denied')
  });

  it('should delete employee if user is admin', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.loggedUser = { isAdmin: true };
    component.deleteEmployee('1');
    expect(dispatchSpy).toHaveBeenCalledWith(deleteEmployee({id:'1'}));
    expect(toastr.success).toHaveBeenCalledWith('Employee deleted successfully', 'Deleted');
  });

  it('should unsubscribe on destroy', () => {
    const unsubSpy = spyOn(component['subs'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubSpy).toHaveBeenCalled();
  });
});
