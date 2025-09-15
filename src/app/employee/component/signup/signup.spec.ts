import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Signup } from './signup';
import { LoginService } from '../../services/login-service';
import { provideRouter, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../../services/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('Signup', () => {
  let component: Signup;
  let fixture: ComponentFixture<Signup>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;
  let authSpy: jasmine.SpyObj<Auth>;

  beforeEach(async () => {
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['checkEmailExists', 'createId']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    authSpy = jasmine.createSpyObj('Auth', ['logIn']);

    await TestBed.configureTestingModule({
      imports: [Signup, ReactiveFormsModule],
      providers: [
        provideRouter([]),
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: Auth, useValue: authSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Signup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error if form InValid', () => {
    component.signupForm.setValue({
      name: '',
      email: '',
      password: '',
      isAdmin: false
    });
    component.signupSubmit();
    expect(component.signupForm.invalid).toBeTrue();
    expect(toastrSpy.error).toHaveBeenCalledWith('Please Enter Email and Passowrd','Create your Account');
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
  });
});
