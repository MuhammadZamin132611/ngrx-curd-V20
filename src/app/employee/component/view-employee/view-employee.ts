import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../Material.module';
import { EmployeeService } from '../../services/employee-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmployeeModel } from '../../model/employeemodel';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-employee',
  imports: [MaterialModule, DatePipe],
  templateUrl: './view-employee.html',
  styleUrl: './view-employee.scss'
})
export class ViewEmployee implements OnInit, AfterViewInit {
  loggedUser: any;
  displayedColumns: string[] = ['name', 'title', 'location', 'type', 'start', 'end', 'edit'];
  allEmployee!: EmployeeModel[];
  dataSource: MatTableDataSource<EmployeeModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private empService: EmployeeService, private toastr: ToastrService, private router: Router, private cdr: ChangeDetectorRef) {
    // Create 100 users

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.allEmployee);
  }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('login') || '{}');
    this.getEmployee();
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


  getEmployee() {
    this.empService.getAllEmployee().subscribe({
      next: (employee: EmployeeModel[]) => {
        this.allEmployee = employee;
        this.dataSource.data = this.allEmployee
        this.dataSource.paginator = this.paginator
        console.log(employee);
      },
      error: () => {
        this.toastr.error('Something Worng', 'Error')
      }
    })
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

    this.empService.deleteEmployee(id).subscribe({
      next: () => {
        this.toastr.success('Employee Deleted', 'Delete');
        this.getEmployee();
      },
      error: () => {
        this.toastr.error('Something Worng', 'Error');
      }
    })
  }
}

