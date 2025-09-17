import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Calender } from './calender';
import { CalenderService } from '../../../../services/calender-service';
import { DatePipe } from '@angular/common';
import { provideRouter } from '@angular/router';
import { CalenderModel } from '../../../../model/calender.model';
import { throwError } from 'rxjs';

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

  // it('should initialize event from service', fakeAsync(()=>{
  //   const mockData: CalenderModel[]=[
  //     { title: 'Team Meeting', startDate: '2025-09-25T09:00:00', startTime: '09:30', endTime: '11:00' }
  //   ]
  // }));

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

});
