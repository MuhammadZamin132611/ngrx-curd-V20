import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl: string = `http://localhost:3000/login`
  constructor(private http: HttpClient) { }

  getUser(): Observable<LoginModel> {
    return this.http.get<LoginModel>(`${this.baseUrl}`)
    // return this.http.get<LoginModel>(`${this.baseUrl}?id=${id}`)
  }

}
