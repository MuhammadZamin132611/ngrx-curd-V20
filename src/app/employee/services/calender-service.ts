import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalenderModel } from '../model/calender.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {
  baseUrl: string = 'http://localhost:3000/calender';

  constructor(private http: HttpClient) { }

  getCalender(): Observable<CalenderModel[]> {
    return this.http.get<CalenderModel[]>(`${this.baseUrl}`);
  }

  getByIdCalender(id: string | undefined): Observable<CalenderModel> {
    return this.http.get<CalenderModel>(`${this.baseUrl}/${id}`)
  }

  addCalender(data: CalenderModel): Observable<CalenderModel> {
    return this.http.post<CalenderModel>(`${this.baseUrl}`, data);
  }

  updateCalender(id: string | undefined, data: CalenderModel): Observable<CalenderModel> {
    return this.http.put<CalenderModel>(`${this.baseUrl}/${id}`, data);
  }

  deleteCalender(id: string | undefined) {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

}
