import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  const loggedUser = typeof window !== 'undefined' ? localStorage.getItem('login') : null;

  if (loggedUser) {
    return true;
  } else {
    toastr.warning('', 'Please Login');
    router.navigateByUrl('/login');
    return false;
  }
};

export const adminGuard: CanActivateFn = (route, state) => {
  return true;
};

export const userGuard: CanActivateFn = (route, state) => {
  return true;
};
