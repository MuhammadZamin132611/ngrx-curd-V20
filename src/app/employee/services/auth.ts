import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private loggedUserSubject = new BehaviorSubject<any | null>(this.getStoredUser());
  loggedUser$ = this.loggedUserSubject.asObservable();

  private getStoredUser(): any | null {
    const userData = localStorage.getItem('login');
    return userData ? JSON.parse(userData) : null;
  }

  logIn(userData: any) {
    localStorage.setItem('login', JSON.stringify(userData)); // ✅ store full object
    this.loggedUserSubject.next(userData);
  }

  logOut() {
    localStorage.removeItem('login');
    this.loggedUserSubject.next(null); // notify subscribers
  }
}
