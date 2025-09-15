import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Auth } from './auth';
import { skip, take } from 'rxjs';

describe('Auth', () => {
  let service: Auth;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null if no user in localstorage', fakeAsync(() => {
    let result: any;
    service.loggedUser$.pipe(take(1)).subscribe((user) => (result = user))
    tick();
    expect(result).toBeNull();
  }));

  it('should store user and emit when logIn is called', fakeAsync(() => {
    const mockuser = { id: '4DAJw3tWHdh0GN5c', name: 'Test User' };
    let result: any;
    service.logIn(mockuser);

    service.loggedUser$.pipe(skip(1), take(1)).subscribe((user) => (result = user));

    service.logIn(mockuser);
    tick();

    expect(localStorage.getItem('login')).toEqual(JSON.stringify(mockuser));
    expect(result).toEqual(mockuser);
  }));

  it('should clear user and emit null when logOut is called', fakeAsync(() => {
    const mockuser = { id: 'gNh1j3ZESKDM5Zt6', name: 'Another User' };
    let result: any;
    service.logIn(mockuser);


    service.loggedUser$.pipe(skip(1), take(1)).subscribe((user) => (result = user));

    service.logOut();
    tick();

    expect(localStorage.getItem('login')).toBeNull();
    expect(result).toBeNull();
  }));

  it('should initialize with stored user from localstorage', fakeAsync(() => {
    const storeUser = { id: 'Ad5w9fw2kbi8BYLK', name: 'Stored User' }
    let result: any;
    localStorage.setItem('login', JSON.stringify(storeUser));

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const newService = TestBed.inject(Auth);

    newService.loggedUser$.pipe(take(1)).subscribe((user) => (result = user));
    tick();
    expect(result).toEqual(storeUser);
  }));
});
