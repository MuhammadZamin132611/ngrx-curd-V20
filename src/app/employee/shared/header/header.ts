import { Component } from '@angular/core';
import { MaterialModule } from '../../../Material.module';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  imports: [MaterialModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  constructor(private toastr: ToastrService) {}

  showSuccess() {
    this.toastr.error('Create an account', `Don't have an account`);
  }

}
