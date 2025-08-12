import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  const loggedUser = typeof window !== 'undefined' ? localStorage.getItem('login') : null;

  if (loggedUser) {
    // ✅ If already logged in and trying to access login/signup
    if (state.url === '/login' || state.url === '/signup') {
      router.navigateByUrl('/'); // redirect to home/dashboard
      return false;
    }
    return true; // allow other pages
  } else {
    // ✅ If NOT logged in and trying to access protected pages
    if (state.url === '/login' || state.url === '/signup') {
      return true; // allow login/signup
    }
    toastr.warning('', 'Please Login');
    router.navigateByUrl('/login');
    return false;
  }
};


// https://www.youtube.com/watch?v=AXaIOWQwysQ

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  if(typeof window !== 'undefined'){
    const loginUser = localStorage.getItem('login');
    if(loginUser != null){
      const parsedUser = JSON.parse(loginUser);
      const role = parsedUser.isAdmin;
      const allowedRoles = route.data['isAdmin'] as string[];
      if(role && allowedRoles.includes(role)){
        return true;
      }
    }
  }
  toastr.error('You Dont have access','Unauthorized');
  router.navigateByUrl('/employee');
  return false;
};

export const userGuard: CanActivateFn = (route, state) => {
  return true;
};
