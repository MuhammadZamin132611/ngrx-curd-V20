import { DatePipe, NgStyle } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { MaterialModule } from '../../../../../Material.module';

interface CalendarEvent {
  title: string;
  date: Date;
  startIndex: number;
  color: string;
}

@Component({
  selector: 'app-calender',
  imports: [MaterialModule, NgStyle, DatePipe],
  templateUrl: './calender.html',
  styleUrl: './calender.scss'
})


export class Calender {
  // Time slots (9AM - 5PM)
  times = signal(['', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM']);

  // Current week's start date (Monday)
  currentWeekStart = signal(this.getStartOfWeek(new Date()));

  // Mock events
  events = signal<CalendarEvent[]>([
    { title: 'Team Meeting', date: new Date('2025-08-25'), startIndex: 1, color: '#2563eb' },
    { title: 'Client Call', date: new Date('2025-08-27'), startIndex: 3, color: '#facc15' },
    { title: 'Workshop', date: new Date('2025-08-28'), startIndex: 4, color: '#22c55e' }
  ]);

  // Compute 7 days for current week
  days = computed(() => {
    const daysArray: Date[] = [];
    const start = this.currentWeekStart();
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      daysArray.push(d);
    }
    return daysArray;
  });

  // Filter events for a given day
  eventsForDay = (day: Date) => computed(() =>
    this.events().filter(e => e.date.toDateString() === day.toDateString())
  );

  // Navigate weeks
  prevWeek() {
    const newDate = new Date(this.currentWeekStart());
    newDate.setDate(newDate.getDate() - 7);
    this.currentWeekStart.set(this.getStartOfWeek(newDate));
  }

  nextWeek() {
    const newDate = new Date(this.currentWeekStart());
    newDate.setDate(newDate.getDate() + 7);
    this.currentWeekStart.set(this.getStartOfWeek(newDate));
  }

  today() {
    this.currentWeekStart.set(this.getStartOfWeek(new Date()));
  }

  // Utility to get Monday of a given date
  getStartOfWeek(date: Date): Date {
    const day = date.getDay(); // Sunday=0, Monday=1
    const diff = day === 0 ? -6 : 1 - day; // shift Sunday to previous Monday
    const monday = new Date(date);
    monday.setDate(date.getDate() + diff);
    return monday;
    // const day = date.getDay(); // Sunday = 0
    // const sunday = new Date(date);
    // sunday.setDate(date.getDate() - day); // go back to Sunday
    // return sunday;
  }

}
