import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {

  constructor(private http: HttpClient) {}

  sendRegisterForm(formData: any): Observable<any> {
    return this.http.post('/api/courses/register/', formData);
  }

  getTodayRegistrations(): Observable<any[]> {
    return this.http.get<any[]>('/api/courses/seller/today-registrations/');
  }


}
