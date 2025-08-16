import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../Material.module';
import { EmployeeService } from '../../services/employee-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmployeeModel } from '../../model/employeemodel';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAllEmployees, selectEmployeesLoading } from '../../../store/employees/employees.selectors';
import * as EmployeesActions from '../../../store/employees/employees.actions'
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-view-employee',
  imports: [MaterialModule, DatePipe],
  templateUrl: './view-employee.html',
  styleUrl: './view-employee.scss'
})
export class ViewEmployee implements OnInit, AfterViewInit, OnDestroy {
  loggedUser: any;
  displayedColumns: string[] = ['name', 'title', 'location', 'type', 'start', 'end', 'edit'];
  // allEmployee!: EmployeeModel[];
  dataSource: MatTableDataSource<EmployeeModel>;
  allEmployee!: EmployeeModel[];
  employees$!: Observable<EmployeeModel[]>;
  loading$!: Observable<boolean>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private subs = new Subscription();

  constructor(private store: Store, private empService: EmployeeService, private toastr: ToastrService, private router: Router, private cdr: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource(this.allEmployee);

    this.employees$ = this.store.select(selectAllEmployees);
    this.loading$ = this.store.select(selectEmployeesLoading);
  }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('login') || '{}');

    // Dispatch action to load employees
    this.store.dispatch(EmployeesActions.loadEmployees());

    // Subscribe to employees state
    this.subs.add(
      this.store.select(selectAllEmployees).subscribe(employees => {
        this.allEmployee = employees;
        this.dataSource.data = employees; // ✅ updates table
      })
    );

    this.loading$ = this.store.select(selectEmployeesLoading);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  editEmployee(id: string) {
    console.log(id);
    this.router.navigate(['edti-employee', id])
  }



  deleteEmployee(id: string) {
    if (!this.loggedUser?.isAdmin) {
      this.toastr.error('You are not authorized to delete employees', 'Access Denied');
      return;
    }

    this.store.dispatch(EmployeesActions.deleteEmployee({ id }));
    this.toastr.success('Employee deleted successfully', 'Deleted');

    // this.empService.deleteEmployee(id).subscribe({
    //   next: () => {
    //     this.toastr.success('Employee Deleted', 'Delete');
    //   },
    //   error: () => {
    //     this.toastr.error('Something Worng', 'Error');
    //   }
    // })
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

