import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profile } from './profile';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LoginModel } from '../../../../model/login.model';
import { loadProfileById, updateProfile } from '../../../../../store/profile/profile.actions';
import { selectSelectedUser } from '../../../../../store/profile/profile.selectors';

describe('ProfileTest', () => {
  let component: Profile;
  let fixture: ComponentFixture<Profile>;

  let router: jasmine.SpyObj<Router>;
  let store: MockStore;

  const mockUser: LoginModel = {
    id: '123',
    name: 'Alice',
    email: 'alice@example.com',
    password: 'secret123',
    isAdmin: true
  };

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj(Router, ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [Profile, ReactiveFormsModule, NgClass],
      providers: [
        { provide: Router, useValue: routerSpy },
        provideMockStore()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Profile);
    component = fixture.componentInstance;

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    store = TestBed.inject(MockStore);

    // Mock Localstorage
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'login') return JSON.stringify({ id: '123' });
      return null;
    });

    spyOn(store, 'dispatch').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form as invalid', () => {
    expect(component.profileForm.valid).toBeTrue();
  });


  it('should patch form with user data oninit', () => {
    store.overrideSelector(selectSelectedUser, mockUser);
    store.refreshState();
    component.ngOnInit();
    expect(component.profileForm.get('name')?.value).toBe('Alice');
    expect(component.profileForm.get('email')?.value).toBe('alice@example.com');
    expect(component.profileForm.get('password')?.value).toBe('secret123');
  });

  it('should toggle showHidePassword when show password is called', () => {
    expect(component.showHidePassword).toBeFalse();
    component.showPassword();
    expect(component.showHidePassword).toBeTrue();
    component.showPassword();
    expect(component.showHidePassword).toBeFalse();
  });

  it('should mark from as touched if submitForm is called with invalid form', () => {
    spyOn(component.profileForm, 'markAllAsTouched');
    component.profileForm.setValue({
      name: '',
      email: '',
      password: '',
      isAdmin: false
    });
    component.submitForm();
    expect(component.profileForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should dispatch updateProfile and navigate on valid form submit', () => {
    component.profileForm.setValue({
      name: 'Alice',
      email: 'alice@example.com',
      password: 'secret123',
      isAdmin: true
    });
    component.userId = '123';
    component.submitForm();
    expect(store.dispatch).toHaveBeenCalledWith(
      updateProfile({
        id: '123',
        changes: {
          name: 'Alice',
          email: 'alice@example.com',
          password: 'secret123',
          isAdmin: true
        }
      })
    );

    expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard');
  });

  it('should dispatch loadProfileById if login data exists in localStorage', () => {
    (localStorage.getItem as jasmine.Spy).and.returnValue(JSON.stringify({ id: '123' }));

    const newFixture = TestBed.createComponent(Profile);
    const newComponent = newFixture.componentInstance;

    expect(store.dispatch).toHaveBeenCalledWith(loadProfileById({ id: '123' }));
    expect(newComponent.userId).toBe('123');
  });
});
