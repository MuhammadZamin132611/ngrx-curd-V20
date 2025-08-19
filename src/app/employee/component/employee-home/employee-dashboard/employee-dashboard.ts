import { Component } from '@angular/core';
import { MaterialModule } from '../../../../Material.module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  imports: [MaterialModule, RouterOutlet],
  templateUrl: './employee-dashboard.html',
  styleUrl: './employee-dashboard.scss'
})
export class EmployeeDashboard {

}
