import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCalenderMetting } from './add-calender-metting';

describe('AddCalenderMetting', () => {
  let component: AddCalenderMetting;
  let fixture: ComponentFixture<AddCalenderMetting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCalenderMetting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCalenderMetting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
