import { Component } from '@angular/core';
import { MaterialModule } from '../../../Material.module';
import { Header } from "../../shared/header/header";
import { Router, RouterOutlet } from '@angular/router';
import { SideMenu } from "../../shared/side-menu/side-menu";
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-employee-home',
  imports: [MaterialModule, RouterOutlet, Header, SideMenu],
  templateUrl: './employee-home.html',
  styleUrl: './employee-home.scss'
})
export class EmployeeHome {
  isExpanded = false;
  isDesktop = true;
  advertisement: boolean = true;
  isMenuOpen: boolean = true;
  drawerMode: 'side' | 'over' = 'side';

   constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Handset,
      Breakpoints.Medium
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall] || result.breakpoints[Breakpoints.Small] || result.breakpoints[Breakpoints.Handset]) {
        // For screens ≤ 767px (mobile)
        this.drawerMode = 'over';
        this.advertisement = false;
        this.isMenuOpen = false;
        // this.drawerService.setDrawerState(false);
      } else {
        // For screens > 767px (tablet & desktop)
        this.drawerMode = 'side';
        this.isMenuOpen = true;
        this.advertisement = !result.breakpoints[Breakpoints.Medium]; // Show ad only on large screens
        // this.drawerService.setDrawerState(true);
      }
    });

    // Keep sidebar state synced with service
    // this.drawerService.isOpen$.subscribe(state => {
    //   this.isMenuOpen = state;
    // });
    
    this.checkScreen();
    window.addEventListener('resize', this.checkScreen.bind(this));

  }

  checkScreen() {
    this.isDesktop = window.innerWidth >= 768;
    this.isExpanded = !this.isDesktop; // Force expanded on mobile
  }


}
