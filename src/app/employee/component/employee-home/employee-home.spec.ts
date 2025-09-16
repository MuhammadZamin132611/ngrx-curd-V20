import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeHome } from './employee-home';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SidebarService } from '../../services/sidebar-service';
import { of, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../Material.module';
import { Header } from "../../shared/header/header";
import { SideMenu } from "../../shared/side-menu/side-menu";
import { provideRouter, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Mock dependencies
const mockBreakpointObserver = {
  observe: () => of({
    matches: false,
    breakpoints: {
      [Breakpoints.XSmall]: false,
      [Breakpoints.Small]: false,
      [Breakpoints.Handset]: false,
      [Breakpoints.Medium]: false,
    },
  }),
};

const mockSidebarService = {
  setDrawerState: jasmine.createSpy('setDrawerState'),
  isOpen$: of(true),
};

// Mock ToastrService
const mockToastr = {
  success: jasmine.createSpy('success'),
  error: jasmine.createSpy('error'),
  info: jasmine.createSpy('info'),
  warning: jasmine.createSpy('warning'),
};

describe('EmployeeHome', () => {
  let component: EmployeeHome;
  let fixture: ComponentFixture<EmployeeHome>;
  let breakpointObserver: BreakpointObserver;
  let sidebarService: SidebarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeHome, CommonModule, MaterialModule, Header, SideMenu, RouterOutlet],
      providers: [
        { provide: BreakpointObserver, useValue: mockBreakpointObserver },
        { provide: SidebarService, useValue: mockSidebarService },
        { provide: MatDialog, useValue: {} },
        { provide: ToastrService, useValue: mockToastr },
        provideRouter([])
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeHome);
    component = fixture.componentInstance;
    breakpointObserver = TestBed.inject(BreakpointObserver);
    sidebarService = TestBed.inject(SidebarService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set drawer to over and hide ad on small screens', () => {
    const breakpointSubject = new Subject<any>();
    spyOn(breakpointObserver, 'observe').and.returnValue(breakpointSubject.asObservable());

    fixture.detectChanges();

    breakpointSubject.next({ matches: true, breakpoints: { [Breakpoints.XSmall]: true } });
    fixture.detectChanges();

    expect(component.drawerMode).toBe('over');
    expect(component.advertisement).toBeFalse();
    expect(component.isMenuOpen).toBeFalse();
    expect(sidebarService.setDrawerState).toHaveBeenCalledWith(false);
  });

  it('should set drawer to side and show ad on large screens', () => {
    const breakpointSubject = new Subject<any>();
    spyOn(breakpointObserver, 'observe').and.returnValue(breakpointSubject.asObservable());

    fixture.detectChanges();

    breakpointSubject.next({ matches: false, breakpoints: {} });
    fixture.detectChanges();

    expect(component.drawerMode).toBe('side');
    expect(component.advertisement).toBeTrue();
    expect(component.isMenuOpen).toBeTrue();
    expect(sidebarService.setDrawerState).toHaveBeenCalledWith(true);
  });

  it('should sync isMenuOpen with sidebar service state', () => {
  const isOpenSubject = new Subject<boolean>();
  (sidebarService as any).isOpen$ = isOpenSubject.asObservable();

  spyOn(component['breakpointObserver'], 'observe').and.returnValue(of({
    matches: false,
    breakpoints: {}
  }));

  component.ngOnInit();

  isOpenSubject.next(false);
  fixture.detectChanges();
  expect(component.isMenuOpen).toBe(false);

  isOpenSubject.next(true);
  fixture.detectChanges();
  expect(component.isMenuOpen).toBe(true);
});

});
