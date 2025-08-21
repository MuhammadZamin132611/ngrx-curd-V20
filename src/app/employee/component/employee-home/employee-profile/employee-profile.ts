import { Component } from '@angular/core';
import { MaterialModule } from '../../../../Material.module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employee-profile',
  imports: [MaterialModule, RouterOutlet],
  templateUrl: './employee-profile.html',
  styleUrl: './employee-profile.scss'
})
export class EmployeeProfile {

}
