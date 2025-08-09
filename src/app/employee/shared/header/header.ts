import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../Material.module';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-header',
  imports: [MaterialModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  loggedUser: string | null = null;

  constructor(private toastr: ToastrService, private authService: Auth) { }

  ngOnInit(): void {
    this.authService.loggedUser$.subscribe(user => {
      this.loggedUser = user;
    });
  }

  logOut() {
    this.toastr.success('','Logout');
    this.authService.logOut();
  }

}
