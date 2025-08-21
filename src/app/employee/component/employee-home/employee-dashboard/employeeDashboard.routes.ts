import { Routes } from "@angular/router";
import { EditEmployee } from "./edit-employee/edit-employee";
import { roleGuard } from "../../../gurd/auth-guard";
import { ViewEmployee } from "./view-employee/view-employee";
import { AddEmployee } from "./add-employee/add-employee";
import { Dashboard } from "./dashboard/dashboard";

export const employeeDashboard: Routes = [
    { path: '',title: 'Employee Dashboard',  component: Dashboard },
    { path: 'view-employee', title: 'View Employee', component: ViewEmployee },
    { path: 'add-employee', component: AddEmployee, title: 'Add Employee', canActivate: [roleGuard], data: { isAdmin: [true] } },
    { path: 'edti-employee/:id', component: EditEmployee, title: 'Edit Employee', canActivate: [roleGuard], data: { isAdmin: [true] } },
]