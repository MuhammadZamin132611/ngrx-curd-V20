import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../../Material.module';

@Component({
  selector: 'app-chat-home',
  imports: [MaterialModule],
  templateUrl: './chat-home.html',
  styleUrl: './chat-home.scss'
})
export class ChatHome implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  
}
