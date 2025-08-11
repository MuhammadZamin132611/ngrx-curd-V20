import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./employee/shared/header/header";
import { StorageService } from './employee/services/storage-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(private storage: StorageService) {
    this.storage.getItem(); // Automatically clears if older than 30 days
  }

}
