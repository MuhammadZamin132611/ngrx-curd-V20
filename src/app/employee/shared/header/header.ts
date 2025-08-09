import { Component } from '@angular/core';
import { MaterialModule } from '../../../Material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MaterialModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
