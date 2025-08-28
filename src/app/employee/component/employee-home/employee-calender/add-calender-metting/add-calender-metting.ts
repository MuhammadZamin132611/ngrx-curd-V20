import { Component } from '@angular/core';
import { MaterialModule } from '../../../../../Material.module';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-calender-metting',
  imports: [MaterialModule, RouterLink, ReactiveFormsModule],
  templateUrl: './add-calender-metting.html',
  styleUrl: './add-calender-metting.scss'
})
export class AddCalenderMetting {
meetingForm!: FormGroup;
  times: { value: string, label: string }[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.generateTimeSlots();

    const now = new Date();
    const rounded = this.roundToNearest30(now); // round to nearest half-hour
    const startTime = `${rounded.getHours()}:${rounded.getMinutes().toString().padStart(2, '0')}`;

    const end = new Date(rounded);
    end.setMinutes(end.getMinutes() + 30);
    const endTime = `${end.getHours()}:${end.getMinutes().toString().padStart(2, '0')}`;


    this.meetingForm = this.fb.group({
      title: [''],
      participants: [''],
      startDate: [now],
      startTime: [this.times.find(t => t.value === startTime)?.value],
      endDate: [now],
      endTime: [this.times.find(t => t.value === endTime)?.value],
      location: [''],
      details: [''],
      repeat: ['none'],
      bypassLobby: ['invited'],
      presenter: ['everyone']
    });
  }

  generateTimeSlots() {
    for (let h = 0; h < 24; h++) {
      for (let m of [0, 30]) {
        const hour12 = h % 12 === 0 ? 12 : h % 12;
        const ampm = h < 12 ? 'AM' : 'PM';
        const label = `${hour12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
        const value = `${h}:${m.toString().padStart(2, '0')}`;
        this.times.push({ value, label });
      }
    }
  }

  roundToNearest30(date: Date): Date {
    const minutes = date.getMinutes();
    const roundedMinutes = minutes < 30 ? 0 : 30;
    date.setMinutes(roundedMinutes, 0, 0);
    return date;
  }

  saveMeeting() {
    console.log(this.meetingForm.value);
  }
}
