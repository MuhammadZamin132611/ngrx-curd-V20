import { Routes } from "@angular/router";

export const employeeHomeRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./employee-home').then(c => c.EmployeeHome),
        children: [
            {
                path: '',
                loadChildren: () => import('./employee-dashboard/employeeDashboard.routes').then(r => r.employeeDashboard)
            }
        ]
    }

]