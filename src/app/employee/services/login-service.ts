import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../model/login.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseurl: string = `http://localhost:3000/login`

  constructor(private http: HttpClient) { }

  checkEmailExists(email: string, password: string): Observable<boolean> {
    return this.http.get<LoginModel[]>(this.baseurl).pipe(
      map(users => users.some(
        user => user.email.toLowerCase() === email.toLowerCase() &&
          user.password.toLowerCase() === password.toLowerCase()
      ))
    );
  }

  createId(data: LoginModel): Observable<LoginModel> {
    return this.http.post<LoginModel>(`${this.baseurl}`, data);
  }

  checkUser(email: string | undefined, password: string | undefined) {
    return this.http.get<LoginModel[]>(`${this.baseurl}?email=${email}&password=${password}`);
  }

}
