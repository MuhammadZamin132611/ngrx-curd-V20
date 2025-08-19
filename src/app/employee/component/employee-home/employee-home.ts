import { Component } from '@angular/core';
import { MaterialModule } from '../../../Material.module';
import { Header } from "../../shared/header/header";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employee-home',
  imports: [MaterialModule, RouterOutlet, Header],
  templateUrl: './employee-home.html',
  styleUrl: './employee-home.scss'
})
export class EmployeeHome {

}
