import { Routes } from '@angular/router';
import { ViewEmployee } from './employee/component/view-employee/view-employee';
import { AddEmployee } from './employee/component/add-employee/add-employee';
import { EditEmployee } from './employee/component/edit-employee/edit-employee';

export const routes: Routes = [
    { path: 'employee', component: ViewEmployee, title: 'All Employee' },
    { path: 'add-employee', component: AddEmployee, title: 'Add Employee' },
    { path: 'add-employee', component: EditEmployee, title: 'Edit Employee' },
    { path: '', redirectTo:'/employee', pathMatch:'full' },
];
