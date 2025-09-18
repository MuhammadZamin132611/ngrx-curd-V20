import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Calender } from './calender';
import { CalenderService } from '../../../../services/calender-service';
import { DatePipe } from '@angular/common';
import { provideRouter } from '@angular/router';
import { CalenderModel } from '../../../../model/calender.model';
import { of, throwError } from 'rxjs';

describe('Calender', () => {
  let component: Calender;
  let fixture: ComponentFixture<Calender>;

  let calenderService: jasmine.SpyObj<CalenderService>;

  beforeEach(async () => {
    const spyService = jasmine.createSpyObj('CalenderService', ['getCalender']);
    await TestBed.configureTestingModule({
      imports: [Calender],
      providers: [
        { provide: CalenderService, useValue: spyService },
        DatePipe, provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Calender);
    component = fixture.componentInstance;
    calenderService = TestBed.inject(CalenderService) as jasmine.SpyObj<CalenderService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize event from service', fakeAsync(() => {
    const mockData: CalenderModel[] = [
      {
        id: "4DAJw3tWHdh0GN5c",
        title: "Team Meeting",
        participants: "zamin@gmail.com",
        startDate: "2025-09-11T09:00:00.000Z",
        startTime: "9:30",
        endDate: "2025-09-11T09:00:00.000Z",
        endTime: "11:00",
        location: "Delhi",
        details: "Screening the project",
        repeat: "none",
        bypassLobby: "invited",
        presenter: "everyone"
      }];

    calenderService.getCalender.and.returnValue(of(mockData));
    component.ngOnInit();
    tick();

    const events = component.events();
    expect(events.length).toBe(1);
    expect(events[0].title).toBe('Team Meeting');
    expect(events[0].startTime).toBe('9:30');
  }));

  it('should handel service error', fakeAsync(() => {
    spyOn(console, 'error');
    calenderService.getCalender.and.returnValue(throwError(() => new Error('Service failed')));

    component.ngOnInit();
    tick();

    expect(console.error).toHaveBeenCalledWith(jasmine.any(Error));
    expect(component.events().length).toBe(0);
  }));

  it('should navigate to next week', () => {
    const start = component.currentWeekStart();
    component.nextWeek();
    const next = component.currentWeekStart();
    expect(next.getDate()).toBe(start.getDate() + 7);
  });

  it('should navigate to previous week', () => {
    const start = component.currentWeekStart();
    component.prevWeek();
    const prev = component.currentWeekStart();
    expect(prev.getDate()).toBe(start.getDate() - 7);
  });

  it('should reset to current week (mocked date)', () => {
    component.prevWeek();
    component.today();

    const start = component.currentWeekStart();
    const expectedMonday = component.getStartOfWeek(new Date());

    expect(start.toDateString()).toBe(expectedMonday.toDateString());
  });

  it('should filter event for a day', () => {
    const eventDate = new Date('2025-09-25T09:00:00');
    component.events.set([
      { title: 'Event1', date: eventDate, startTime: '09:00' }
    ]);
    const eventsForDay = component.eventsForDay(eventDate)();
    expect(eventsForDay.length).toBe(1);
    expect(eventsForDay[0].title).toBe('Event1');
  });

  it('should return current time index', () => {
    expect(component.getTimeIndex('09:00')).toBe(0);
    expect(component.getTimeIndex('10:00')).toBe(1);
    expect(component.getTimeIndex('09:30')).toBe(0.5);
  });

  it('should computed 7 days for current week', () => {
    const days = component.days();
    expect(days.length).toBe(7);
    expect(days[0] instanceof Date).toBeTrue();
  })

});
