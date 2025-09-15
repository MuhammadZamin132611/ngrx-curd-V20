import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile-service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { LoginModel } from '../model/login.model';

describe('ProfileService', () => {
  let service: ProfileService;
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
        ProfileService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all user ', () => {
    service.getUser().subscribe((user) => {
      expect(user).toEqual(mockLogin);
    });

    const req = httpMock.expectOne(service.baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockLogin);
  });

  it('should get user by id', () => {
    const id = mockLogin.id;
    service.getUserById(id).subscribe((user) => {
      expect(user).toEqual([mockLogin]);
    });

    const req = httpMock.expectOne(`${service.baseUrl}?id=${id}`);
    expect(req.request.method).toBe('GET');
    req.flush([mockLogin]);
  });

  it('should update an user', () => {
    const updateUser: LoginModel = { ...mockLogin, name: 'Update name' };
    const id = mockLogin.id;

    service.updateUser(id, updateUser).subscribe((user) => {
      expect(user).toEqual(updateUser);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updateUser);
  })
});
