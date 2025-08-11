import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../component/modal/login.modal';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseurl: string = `http://localhost:3000/`

  constructor(private http: HttpClient) { }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<LoginModel[]>(this.baseurl + `login`).pipe(
      map(users => users.some(user => user.email.toLowerCase() === email.toLowerCase()))
    );
  }

  createId(data: LoginModel): Observable<LoginModel> {
    return this.http.post<LoginModel>(`${this.baseurl}login`, data);
  }

  checkUser(email: string, password: string) {
    return this.http.get<LoginModel[]>(`${this.baseurl}login?email=${email}&password=${password}`);
  }

}
