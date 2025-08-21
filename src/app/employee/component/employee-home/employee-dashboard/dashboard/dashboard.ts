import { Component } from '@angular/core';
import { MaterialModule } from '../../../../../Material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  constructor(private router: Router) { }

}
