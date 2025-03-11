// my-students.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-my-students',
  templateUrl: './my-students.component.html'
})
export class MyStudentsComponent implements OnInit {
  data: any[] = [];
  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    this.loadStudentsProgress();
  }

  loadStudentsProgress() {
    this.http.get<any[]>('/api/courses/curator/progress/', {
      headers: this.auth.getAuthHeaders()
    }).subscribe({
      next: (res) => {
        this.data = res;
      },
      error: (err) => {
        console.error('Ошибка', err);
      }
    });
  }
}
