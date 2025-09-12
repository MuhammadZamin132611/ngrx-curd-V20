import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../../Material.module';
import { NgClass } from '@angular/common';
import { SidebarService } from '../../services/sidebar-service';

@Component({
  selector: 'app-side-menu',
  imports: [MaterialModule, NgClass, RouterLink],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.scss'
})
export class SideMenu {
  // @Input() isExpanded: boolean = false;
  userRole: any;
  userName: any;
  constructor(private router: Router, private sidebarService: SidebarService) {
    const userData = localStorage.getItem('login')
    if (userData != null) {
      const parsedUser = JSON.parse(userData);
      const role = parsedUser.isAdmin;
      this.userRole = role;
      const name = parsedUser.name;
      this.userName = name;
    }
  }


  isActiveRoute(path: string): boolean {
    return this.router.url === path || this.router.url.startsWith(path);
  }

  toggleMenu() {
    this.sidebarService.toggleDrawer();
  }

  menuList: list[] = [
    {
      iconName: 'dashboard_outline',
      listName: 'Dashboard',
      link: '/dashboard/home'
    },
    {
      iconName: 'chat_outline',
      listName: 'Chat',
      link: '/dashboard/chat'
    },
    {
      iconName: 'person_outline',
      listName: 'Profile',
      link: '/dashboard/profile'
    },
    {
      iconName: 'work_outline',
      listName: 'Projects',
      link: '/dashboard/project'
    },
    {
      iconName: 'calendar_today',
      listName: 'Calender',
      link: '/dashboard/calender'
    },
  ]

}

interface list {
  iconName: string;
  listName: string;
  link: string;
}
