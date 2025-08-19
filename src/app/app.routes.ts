import { Routes } from '@angular/router';
import { ViewEmployee } from './employee/component/employee-home/view-employee/view-employee';
import { AddEmployee } from './employee/component/employee-home/add-employee/add-employee';
import { Login } from './employee/component/login/login';
import { Signup } from './employee/component/signup/signup';
import { authGuard, roleGuard } from './employee/gurd/auth-guard';
import { EmployeeHome } from './employee/component/employee-home/employee-home';
import { EditEmployee } from './employee/component/employee-home/edit-employee/edit-employee';

export const routes: Routes = [
    { path: 'employee', component: EmployeeHome, title: 'Employee', },
    { path: 'login', component: Login, title: 'Login Employee', canActivate: [authGuard] },
    { path: 'signup', component: Signup, title: 'Signup Employee', canActivate: [authGuard] },
    { path: 'view-employee', component: ViewEmployee, title: 'All Employee', canActivate: [authGuard], },
    { path: 'add-employee', component: AddEmployee, title: 'Add Employee', canActivate: [authGuard, roleGuard], data: { isAdmin: [true] } },
    { path: 'edti-employee/:id', component: EditEmployee, title: 'Edit Employee', canActivate: [authGuard, roleGuard], data: { isAdmin: [true] } },
    { path: '', redirectTo: '/employee', pathMatch: 'full', },
];
