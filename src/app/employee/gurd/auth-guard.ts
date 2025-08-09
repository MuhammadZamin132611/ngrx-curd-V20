import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  if(typeof window !== 'undefined'){
    const loggedUser = localStorage.getItem('login');
    if(loggedUser != null){
      return true
    }
    else{
      toastr.warning('', 'Please Login');
      router.navigateByUrl('/');
      return false;
    }
  }

  router.navigateByUrl('/');
  return false;
};

export const adminGuard: CanActivateFn = (route, state) => {
  return true;
};

export const userGuard: CanActivateFn = (route, state) => {
  return true;
};
