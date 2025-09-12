import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../../Material.module';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-chat-home',
  imports: [MaterialModule, NgClass],
  templateUrl: './chat-home.html',
  styleUrl: './chat-home.scss'
})
export class ChatHome implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  isSidebarOpen = false;
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
