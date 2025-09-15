import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { authGuard, roleGuard } from './auth-guard';
import { ToastrService } from 'ngx-toastr';

describe('Guards', () => {
  let routerSpy: jasmine.SpyObj<Router>;
  let toastrSpy: jasmine.SpyObj<ToastrService>


  const executeAuthGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  const executeRoleGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => roleGuard(...guardParameters));

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['warning', 'error']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ToastrService, useValue: toastrSpy }
      ],
    });
    localStorage.clear();
  });


  describe('authGuard', () => {
    it('should redirect logged in user away from /login', () => {
      localStorage.setItem('login', JSON.stringify({ id: 'jhgdcfh' }));
      const result = executeAuthGuard({} as any, { url: '/login' } as any);
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/dashboard');
      expect(result).toBeFalse();
    });

    it('should allow logged in user to access dashboard', () => {
      localStorage.setItem('login', JSON.stringify({ id: 'Sqh1hj' }));
      const result = executeAuthGuard({} as any, { url: '/dashboard' } as any);
      expect(result).toBeTrue();
    });

    it('should allow guest to access /login', () => {
      const result = executeAuthGuard({} as any, { url: '/login' } as any);
      expect(result).toBeTrue();
    });

    it('should block guest from /dashboard and redirect to login', () => {
      const result = executeAuthGuard({} as any, { url: '/dashboard' } as any);
      expect(toastrSpy.warning).toHaveBeenCalled();
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
      expect(result).toBeFalse();
    });
  });

  describe('roleGuard', () => {
    it('should allow admin if role matchec', () => {
      localStorage.setItem('login', JSON.stringify({ isAdmin: 'admin' }));
      const result = executeRoleGuard({ data: { isAdmin: ['admin'] } } as any, {} as any);
      expect(result).toBeTrue();
    });

    it('should block non-admin user', () => {
      localStorage.setItem('login', JSON.stringify({ isAdmin: 'user' }));
      const result = executeRoleGuard({ data: { isAdmin: ['admin'] } } as any, {} as any);
      expect(toastrSpy.error).toHaveBeenCalledWith('You are not an admin', 'Unauthorized');
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/dashboard');
      expect(result).toBeFalse();
    });

    it('should block guest (no login data)', () => {
      const result = executeRoleGuard({ data: { isAdmin: ['admin'] } } as any, {} as any);
      expect(toastrSpy.error).toHaveBeenCalled();
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/dashboard');
      expect(result).toBeFalse();
    });
  });


});

