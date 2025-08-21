import { Routes } from "@angular/router";

export const employeeHomeRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./employee-home').then(c => c.EmployeeHome),
        children: [
            {
                path: 'home',
                loadChildren: () => import('./employee-dashboard/employeeDashboard.routes').then(r => r.employeeDashboard)
            },
            {
                path: 'profile',
                loadChildren: () => import('./employee-profile/employeeProfile.routes').then(r => r.employeeProfile)
            },
            { path: '', redirectTo: '/dashboard/home', pathMatch: 'full', },
        ]
    }

]