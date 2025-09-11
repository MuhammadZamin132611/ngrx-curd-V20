import { Component } from '@angular/core';
import { MaterialModule } from '../../../../../Material.module';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalenderService } from '../../../../services/calender-service';
import { CalenderModel } from '../../../../model/calender.model';

@Component({
  selector: 'app-add-calender-metting',
  imports: [MaterialModule, RouterLink, ReactiveFormsModule],
  templateUrl: './add-calender-metting.html',
  styleUrl: './add-calender-metting.scss'
})
export class AddCalenderMetting {
  meetingForm!: FormGroup;
  times: { value: string, label: string }[] = [];

  constructor(private fb: FormBuilder, private _service: CalenderService) { }

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
      participants: ['', [Validators.required]],
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

  _generateId(length: number = 16): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  addMeetInCalender() {

  }

  roundToNearest30(date: Date): Date {
    const minutes = date.getMinutes();
    const roundedMinutes = minutes < 30 ? 0 : 30;
    date.setMinutes(roundedMinutes, 0, 0);
    return date;
  }

  saveMeeting() {
    if (this.meetingForm.valid) {
      const _CalenderObj: CalenderModel = {
        id: this._generateId(),
        title: this.meetingForm.value.title,
        participants: this.meetingForm.value.participants,
        startDate: this.meetingForm.value.startDate,
        startTime: this.meetingForm.value.startTime,
        endDate: this.meetingForm.value.endDate,
        endTime: this.meetingForm.value.endTime,
        location: this.meetingForm.value.location,
        details: this.meetingForm.value.details,
        repeat: this.meetingForm.value.repeat,
        bypassLobby: this.meetingForm.value.bypassLobby,
        presenter: this.meetingForm.value.presenter,
      }

      this._service.addCalender(_CalenderObj).subscribe({
        next: () => {
          console.log('Valid', _CalenderObj);

        }
      })
    }
    else {
      console.log('InValid', this.meetingForm.value);
    }
  }
}
