import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login-service';
import { Auth } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';
import { provideRouter, Router } from '@angular/router';
import { LoginModel } from '../../model/login.model';
import { of, throwError } from 'rxjs';

let router: Router;
describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let authSpy: jasmine.SpyObj<Auth>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['checkUser']);
    authSpy = jasmine.createSpyObj('Auth', ['logIn']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [Login, ReactiveFormsModule],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: Auth, useValue: authSpy },
        { provide: ToastrService, useValue: toastrSpy },
        provideRouter([]),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should show error if form is invalid on submit', () => {
    component.loginForm.setValue({ email: '', password: '' });
    component.loginSubmit();

    expect(toastrSpy.error).toHaveBeenCalledWith('Please Enter Email and Passowrd', 'Use your Crediential');
  });

  it('should log in successfully when valid credientials are provide', () => {
    const mockUser: LoginModel = { email: 'test@example.com', password: '123456' };

    component.loginForm.setValue({ email: mockUser.email, password: mockUser.password });
    loginServiceSpy.checkUser.and.returnValue(of([mockUser]));

    component.loginSubmit();

    expect(loginServiceSpy.checkUser).toHaveBeenCalledWith(mockUser.email, mockUser.password);
    expect(authSpy.logIn).toHaveBeenCalledWith(mockUser);
    expect(toastrSpy.success).toHaveBeenCalledWith('Welcome Back', 'Successfully Login');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard/home');
  });

  it('should show error when crediential are invalid', () => {
    component.loginForm.setValue({ email: 'wrong@test.com', password: 'wrongpass' });
    loginServiceSpy.checkUser.and.returnValue(of([]));
    component.loginSubmit();

    expect(toastrSpy.error).toHaveBeenCalledWith('Invalid Email or Password', 'Login Failed');
  });

  it('should show error on login service failure', () => {
    component.loginForm.setValue({ email: 'test@test.com', password: '123456' });
    loginServiceSpy.checkUser.and.returnValue(throwError(() => new Error('Service error')));

    component.loginSubmit();

    expect(toastrSpy.error).toHaveBeenCalledWith('Error logging in', 'Something Error');
  });

  it('should generate an ID of default length 16', () => {
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
  })

});
