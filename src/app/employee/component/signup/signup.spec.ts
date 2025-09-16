import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { Signup } from './signup';
import { LoginService } from '../../services/login-service';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../../services/auth';
import { LoginModel } from '../../model/login.model';

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
    authSpy = jasmine.createSpyObj('Auth', ['logIn']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

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

  it('should show an error if the form is invalid', () => {
    component.signupForm.setValue({
      name: '',
      email: '',
      password: '',
      isAdmin: false
    });
    component.signupSubmit();
    expect(component.signupForm.invalid).toBeTrue();
    expect(toastrSpy.error).toHaveBeenCalledWith('Please Enter Email and Passowrd', 'Create your Account');
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should successfully create a new user and navigate to the dashboard', (done) => {
    // Setup: mock valid form data
    const validFormData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      isAdmin: false
    };
    component.signupForm.setValue(validFormData);

    // Mock: service calls
    loginServiceSpy.checkEmailExists.and.returnValue(of(false));
    loginServiceSpy.createId.and.returnValue(of({}) as any);

    // Act: trigger form submission
    component.signupSubmit();

    // Assertions
    fixture.whenStable().then(() => {
      expect(loginServiceSpy.checkEmailExists).toHaveBeenCalled();
      expect(loginServiceSpy.createId).toHaveBeenCalled();
      expect(authSpy.logIn).toHaveBeenCalled();
      expect(toastrSpy.success).toHaveBeenCalledWith('', 'Successfully Login');
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/dashboard/home');
      done();
    });
  });
});