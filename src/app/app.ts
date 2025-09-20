import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StorageService } from './employee/services/storage-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Hello, ngrx-curd';
  
  constructor(private storage: StorageService) {
    this.storage.getItem(); // Automatically clears if older than 30 days
  }

}
