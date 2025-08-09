import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../component/modal/login.modal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseurl: string = `http://localhost:3000/`

  constructor(private http: HttpClient) { }

  createId(data: LoginModel): Observable<LoginModel> {
    return this.http.post<LoginModel>(`${this.baseurl}login`, data);
  }

}
