import { Routes } from '@angular/router';
import { Login } from './employee/component/login/login';
import { Signup } from './employee/component/signup/signup';
import { authGuard, roleGuard } from './employee/gurd/auth-guard';
import { EmployeeHome } from './employee/component/employee-home/employee-home';

export const routes: Routes = [
    
    { path: 'login', component: Login, title: 'Login Employee', canActivate: [authGuard] },
    { path: 'signup', component: Signup, title: 'Signup Employee', canActivate: [authGuard] },
    {
        path: 'dashboard', loadChildren: () => import('./employee/component/employee-home/employeeHome.routes').then(r => r.employeeHomeRoutes), canActivate: [authGuard],
    },
    { path: '', redirectTo: '/employee', pathMatch: 'full', },
];
