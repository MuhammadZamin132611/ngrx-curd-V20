import { Routes } from "@angular/router";
import { ViewEmployee } from "../view-employee/view-employee";
import { AddEmployee } from "../add-employee/add-employee";
import { EditEmployee } from "../edit-employee/edit-employee";
import { roleGuard } from "../../../gurd/auth-guard";

export const employeeDashboard: Routes = [
    { path: 'view-employee', component: ViewEmployee },
    { path: 'add-employee', component: AddEmployee, title: 'Add Employee', canActivate: [roleGuard], data: { isAdmin: [true] } },
    { path: 'edti-employee/:id', component: EditEmployee, title: 'Edit Employee', canActivate: [roleGuard], data: { isAdmin: [true] } },
]