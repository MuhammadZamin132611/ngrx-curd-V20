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
                path: 'chat',
                loadChildren: () => import('./employee-chat/employeeChat.routes').then(r => r.chatRoutes)
            },
            {
                path: 'profile',
                loadChildren: () => import('./employee-profile/employeeProfile.routes').then(r => r.employeeProfile)
            },
            {
                path: 'project',
                loadChildren: () => import('./employee-projects/employeeProjects.routes').then(r => r.employeeProjects)
            },
            {
                path: 'calender',
                loadChildren: () => import('./employee-calender/employeeCalender.routes').then(r => r.employeeCalender)
            },
            { path: '', redirectTo: '/dashboard/home', pathMatch: 'full', },
        ]
    }

]