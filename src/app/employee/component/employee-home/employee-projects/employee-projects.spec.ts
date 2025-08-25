import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProjects } from './employee-projects';

describe('EmployeeProjects', () => {
  let component: EmployeeProjects;
  let fixture: ComponentFixture<EmployeeProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeProjects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeProjects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
