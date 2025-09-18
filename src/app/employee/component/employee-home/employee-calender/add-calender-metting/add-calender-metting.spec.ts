import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCalenderMetting } from './add-calender-metting';
import { CalenderService } from '../../../../services/calender-service';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

describe('AddCalenderMetting', () => {
  let component: AddCalenderMetting;
  let fixture: ComponentFixture<AddCalenderMetting>;

  let calenderServiceSpy: jasmine.SpyObj<CalenderService>

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CalenderService', ['addCalender']);

    await TestBed.configureTestingModule({
      imports: [AddCalenderMetting, ReactiveFormsModule],
      providers: [{ provide: CalenderService, useValue: spy }, provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCalenderMetting);
    component = fixture.componentInstance;
    calenderServiceSpy = TestBed.inject(CalenderService) as jasmine.SpyObj<CalenderService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.meetingForm).toBeTruthy();
    expect(component.meetingForm.get('participants')?.value).toBe('');
    expect(component.meetingForm.get('repeat')?.value).toBe('none');
  });

  it('should not save meeting when form is invalid', () => {
    spyOn(console, 'log');
    component.meetingForm.patchValue({ participants: '' }); // required field missing
    component.saveMeeting();
    expect(console.log).toHaveBeenCalledWith('InValid', jasmine.any(Object));
    expect(calenderServiceSpy.addCalender).not.toHaveBeenCalled();
  });

  it('should generate 48 time slots (24h × 2)', () => {
  expect(component.times.length).toBe(48);
  expect(component.times[0].label).toBe('12:00 AM');
  expect(component.times[component.times.length - 1].label).toBe('11:30 PM');
});

it('should save meeting when form is valid', () => {
  const mockMeeting = {
    title: 'Test Meeting',
    participants: 'test@example.com',
    startDate: '2025-09-11T09:00:00.000Z',
    startTime: '10:00',
    endDate: '2025-09-11T09:00:00.000Z',
    endTime: '10:30',
    location: 'Office',
    details: 'Details',
    repeat: 'none',
    bypassLobby: 'invited',
    presenter: 'everyone'
  };

  component.meetingForm.patchValue(mockMeeting);

  // ✅ must return an observable, otherwise subscribe is undefined
  calenderServiceSpy.addCalender.and.returnValue(of(mockMeeting));

  spyOn(console, 'log');

  component.saveMeeting();

  expect(calenderServiceSpy.addCalender).toHaveBeenCalled();
  expect(console.log).toHaveBeenCalledWith(
    'Valid',
    jasmine.objectContaining({ title: 'Test Meeting' })
  );
});

});
