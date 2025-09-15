import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../../services/auth';
import { SidebarService } from '../../services/sidebar-service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let authServiceSpy: jasmine.SpyObj<Auth>;
  let sidebarServiceSpy: jasmine.SpyObj<SidebarService>;

  beforeEach(async () => {
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success']);
    authServiceSpy = jasmine.createSpyObj('Auth', ['logOut'], {
      loggedUser$: of('testUser')
    });
    sidebarServiceSpy = jasmine.createSpyObj('SidebarService', ['toggleDrawer'])
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([]),
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: Auth, useValue: authServiceSpy },
        { provide: SidebarService, useValue: sidebarServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Header component', () => {
    expect(component).toBeTruthy();
  });

  it('should set loggedUser from authService on init', () => {
    expect(component.loggedUser).toBe('testUser');
  });

  it('should call sidebarService.toggleDrawer when toggleMenu is called', () => {
    component.toggleMenu();
    expect(sidebarServiceSpy.toggleDrawer).toHaveBeenCalled();
  });

  it('should call toastr.success and authService.logOut when logOut is called', () => {
    component.logOut();
    expect(toastrServiceSpy.success).toHaveBeenCalledWith('', 'Logout');
    expect(authServiceSpy.logOut).toHaveBeenCalled();
  });
});
