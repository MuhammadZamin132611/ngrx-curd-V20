import { Component } from '@angular/core';
import { MaterialModule } from '../../../../../Material.module';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  constructor(private router: Router) { }

}
