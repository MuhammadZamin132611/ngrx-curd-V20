import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../../../Material.module';

@Component({
  selector: 'app-calender',
  imports: [MaterialModule, NgStyle],
  templateUrl: './calender.html',
  styleUrl: './calender.scss'
})
export class Calender {
  times = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'];
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  events = [
    { title: 'Team Meeting', day: 'Monday', startIndex: 1, color: '#2563eb' },   // 10 AM
    { title: 'Client Call', day: 'Wednesday', startIndex: 3, color: '#facc15' }, // 12 PM
    { title: 'Workshop', day: 'Thursday', startIndex: 4, color: '#22c55e' }     // 1 PM
  ];
}
