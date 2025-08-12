import { Routes } from '@angular/router';
import { ViewEmployee } from './employee/component/view-employee/view-employee';
import { AddEmployee } from './employee/component/add-employee/add-employee';
import { EditEmployee } from './employee/component/edit-employee/edit-employee';
import { Login } from './employee/component/login/login';
import { Signup } from './employee/component/signup/signup';
import { authGuard, roleGuard } from './employee/gurd/auth-guard';

export const routes: Routes = [
    { path: 'login', component: Login, title: 'All Employee', canActivate: [authGuard] },
    { path: 'signup', component: Signup, title: 'All Employee', canActivate: [authGuard] },
    { path: 'employee', component: ViewEmployee, title: 'All Employee', canActivate: [authGuard], },
    { path: 'add-employee', component: AddEmployee, title: 'Add Employee', canActivate: [authGuard, roleGuard], data: { isAdmin: [true] } },
    { path: 'edti-employee/:id', component: EditEmployee, title: 'Edit Employee', canActivate: [authGuard, roleGuard], data: { isAdmin: [true] } },
    { path: '', redirectTo: '/employee', pathMatch: 'full', },
];
