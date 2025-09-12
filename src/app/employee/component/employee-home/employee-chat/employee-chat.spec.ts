import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeChat } from './employee-chat';

describe('EmployeeChat', () => {
  let component: EmployeeChat;
  let fixture: ComponentFixture<EmployeeChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeChat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
