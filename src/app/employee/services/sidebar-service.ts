import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  
  private isOpen = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpen.asObservable();

  toggleDrawer() {
    this.isOpen.next(!this.isOpen.value);
  }

  setDrawerState(state: boolean) {
    this.isOpen.next(state);
  }
}
