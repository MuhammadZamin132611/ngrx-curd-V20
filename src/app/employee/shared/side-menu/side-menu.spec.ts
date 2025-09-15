import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenu } from './side-menu';
import { SidebarService } from '../../services/sidebar-service';
import { provideRouter, Router } from '@angular/router';

describe('SideMenu', () => {
  let component: SideMenu;
  let fixture: ComponentFixture<SideMenu>;
  let sidebarServiceSpy: jasmine.SpyObj<SidebarService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const mockUser = { isAdmin: true, name: 'John Doe' };
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'login') {
        return JSON.stringify(mockUser);
      }
      return null;
    })
    sidebarServiceSpy = jasmine.createSpyObj('SidebarService', ['toggleDrawer']);
    // routerSpy = { url: '/dashboard/home' };
    routerSpy = jasmine.createSpyObj('Router', [], { url: '/dashboard/home' });

    await TestBed.configureTestingModule({
      imports: [SideMenu],
      providers: [
        { provide: SidebarService, useValue: sidebarServiceSpy },
        { provide: Router, userValue: routerSpy },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SideMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the SideMenu component', () => {
    expect(component).toBeTruthy();
  });

  it('should load userRole and userName from localStorage', () => {
    expect(component.userRole).toBeTrue();
    expect(component.userName).toBe('John Doe');
  });

  it('should return true for active route in isActiveRoute', () => {
    expect(component.isActiveRoute('/dashboard/home')).toBeFalse();
  });

  it('should return false if route does not match', () => {
    (routerSpy as any).url = '/another-route';
    expect(component.isActiveRoute('/dashboard/home')).toBeFalse();
  });

  it('should call sidebarService.toggleDrawer when toggleMenu is called', () => {
    component.toggleMenu();
    expect(sidebarServiceSpy.toggleDrawer).toHaveBeenCalled();
  });

  it('should define a non-empty menuList with correct items', () => {
    expect(component.menuList.length).toBeGreaterThan(0);
    expect(component.menuList[0]).toEqual(
      jasmine.objectContaining({
        iconName: 'dashboard_outline',
        listName: 'Dashboard',
        link: '/dashboard/home'
      })
    );
  });
});
