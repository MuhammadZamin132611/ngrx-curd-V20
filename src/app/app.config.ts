import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { employeesReducer } from './store/employees/employees.reducer';
import { EmployeesEffects } from './store/employees/employees.effects';
import { ProfileEffects } from './store/profile/profile.effects';
import { profileReducre } from './store/profile/profile.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(),
    provideStore({ employees: employeesReducer, profile: profileReducre }),
    provideEffects([EmployeesEffects, ProfileEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    
  ]
};
