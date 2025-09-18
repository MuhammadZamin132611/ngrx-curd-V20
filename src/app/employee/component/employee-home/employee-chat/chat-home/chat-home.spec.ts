import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHome } from './chat-home';
import { NgClass } from '@angular/common';

describe('ChatHome', () => {
  let component: ChatHome;
  let fixture: ComponentFixture<ChatHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatHome, NgClass]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize sidebar as closed', ()=>{
    expect(component.isSidebarOpen).toBeFalse();
  });

  it('should toggle sidebar open and closed', ()=>{
    expect(component.isSidebarOpen).toBeFalse();

    component.toggleSidebar();
    expect(component.isSidebarOpen).toBeTrue();

    component.toggleSidebar();
    expect(component.isSidebarOpen).toBeFalse();
  });
});
