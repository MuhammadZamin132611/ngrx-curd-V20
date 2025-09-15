import { TestBed } from '@angular/core/testing';

import { LoginService } from './login-service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { LoginModel } from '../model/login.model';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  const mockLogin: LoginModel = {
    name: "Admin",
    email: "admin@gmail.com",
    password: "admin@123",
    isAdmin: true,
    id: "HtMhEbNi1p0slAXh"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if email and password match', (done) => {
    service.checkEmailExists('admin@gmail.com', 'admin@123').subscribe((res) => {
      expect(res).toBeTrue();
      done();
    });
    const req = httpMock.expectOne(`${service.baseurl}`);
    expect(req.request.method).toBe('GET');
    req.flush([mockLogin]);
  });

  it('should return false if email and password do not match', (done) => {
    service.checkEmailExists('wrong@gmail.com', 'wrongPass').subscribe((res) => {
      expect(res).toBeFalse();
      done();
    });
    const req = httpMock.expectOne(`${service.baseurl}`);
    expect(req.request.method).toBe('GET');
    req.flush([mockLogin]);
  });


  it('should be create user', () => {
    service.createId(mockLogin).subscribe((user) => {
      expect(user).toEqual(mockLogin);
    });
    const req = httpMock.expectOne(`${service.baseurl}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockLogin);
  });

  it('should check user available and get', () => {
    const email = mockLogin.email;
    const password = mockLogin.password;

    service.checkUser(email, password).subscribe((user) => {
      expect(user).toEqual([mockLogin]);
    });
    const req = httpMock.expectOne(`${service.baseurl}?email=${email}&password=${password}`);
    expect(req.request.method).toBe('GET');
    req.flush([mockLogin]);
  });
});
