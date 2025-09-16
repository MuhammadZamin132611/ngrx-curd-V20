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


let router: Router;

describe('Signup', () => {
  let component: Signup;
  let fixture: ComponentFixture<Signup>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;
  let authSpy: jasmine.SpyObj<Auth>;

  beforeEach(async () => {
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['checkEmailExists', 'createId']);
    authSpy = jasmine.createSpyObj('Auth', ['logIn']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [Signup, ReactiveFormsModule],
      providers: [
        provideRouter([]),
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: Auth, useValue: authSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Signup);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');

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
    expect(router.navigateByUrl).not.toHaveBeenCalled();
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
      expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard/home');
      done();
    });
  });

  it('should show error if email already exist', () => {
    const FormData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      isAdmin: false
    };
    component.signupForm.setValue(FormData);
    loginServiceSpy.checkEmailExists.and.returnValue(of(true));
    component.signupSubmit();

    expect(toastrSpy.error).toHaveBeenCalledWith('User already registered', 'Error');
    expect(loginServiceSpy.createId).not.toHaveBeenCalled();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should chow error id checkEmailExist Fail', () => {
    const formData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      isAdmin: false
    };

    component.signupForm.setValue(formData);
    loginServiceSpy.checkEmailExists.and.returnValue(throwError(() => new Error('API Error')));

    component.signupSubmit();

    expect(toastrSpy.error).toHaveBeenCalledWith('Error checking email', 'Something Error');
    expect(loginServiceSpy.createId).not.toHaveBeenCalled();
  });

  it('should show error if createdId fails', () => {
    const formData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      isAdmin: false
    };

    component.signupForm.setValue(formData);

    loginServiceSpy.checkEmailExists.and.returnValue(of(false));
    loginServiceSpy.createId.and.returnValue(throwError(() => ({ error: { message: 'Server error' } })));
    component.signupSubmit();
    expect(toastrSpy.error).toHaveBeenCalledWith('Server error', 'Something Error');
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  }); it('should generate an ID of default length 16', () => {
    const id = component._generateId();
    expect(id.length).toBe(16);
  });

  it('should generate an ID of given length 10', () => {
    const id = component._generateId(10);
    expect(id.length).toBe(10);
  });

  it('should only contain allowed characters', () => {
    const id = component._generateId(20);
    const allowedChars = /^[A-Za-z0-9]+$/;
    expect(allowedChars.test(id)).toBeTrue();
  });

  it('should generate different IDs multiple calls (randomness)', () => {
    const id1 = component._generateId();
    const id2 = component._generateId();
    expect(id1).not.toEqual(id2);
  });

});
