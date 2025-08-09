import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../Material.module';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  imports: [MaterialModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  loggedUser: string | null = null;

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.loggedUser = localStorage.getItem('login');
    }
  }


  logOut() {
    if (typeof window !== 'undefined') {
      this.toastr.success('', `Successfully LogOut`);
      localStorage.removeItem('login');
      this.loggedUser = null;
    }
  }

}
