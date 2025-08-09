import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private loggedUserSubject = new BehaviorSubject<string | null>(localStorage.getItem('login'));
  loggedUser$ = this.loggedUserSubject.asObservable();

  logIn(userData: string) {
    localStorage.setItem('login', userData);
    this.loggedUserSubject.next(userData); // notify subscribers
  }

  logOut() {
    localStorage.removeItem('login');
    this.loggedUserSubject.next(null); // notify subscribers
  }
}
