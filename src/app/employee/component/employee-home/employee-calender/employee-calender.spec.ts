import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCalender } from './employee-calender';

describe('EmployeeCalender', () => {
  let component: EmployeeCalender;
  let fixture: ComponentFixture<EmployeeCalender>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeCalender]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeCalender);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
