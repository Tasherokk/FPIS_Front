import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

// Пример интерфейсов для данных
export interface Course {
  id: number;
  title: string;
  description: string;
  course_type?: string;   // "student" или "teacher"
  sub_type?: string;     // может быть null
  img?: string;          // URL картинки
}

export interface Topic {
  id: number;
  title: string;
  order: number;
  video_url?: string;
  video_title?: string;
  duration_in_minutes?: number;
  is_unlocked?: boolean;
  test?: any;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  // 1. Публичные курсы (не требует авторизации)
  getPublicCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/courses/public-courses/');
  }

  // 2. Мои курсы (для студента) - требует JWT
  getMyCourses(): Observable<Course[]> {
    // Пример, если не используете interceptor, добавляем заголовок вручную
    const headers = this.auth.getAuthHeaders();
    return this.http.get<Course[]>('/api/courses/my-courses/', { headers });
  }

  // 3. Список тем курса (где отображаются is_unlocked) - JWT
  getCourseTopics(courseId: number): Observable<Topic[]> {
    const headers = this.auth.getAuthHeaders();
    const url = `/api/courses/my-courses/${courseId}/topics/`;
    return this.http.get<Topic[]>(url, { headers });
  }

  // 4. Публичная (первая) тема курса
  getFirstTopic(courseId: number): Observable<Topic[]> {
    const url = `/api/courses/public-courses/${courseId}/first-topic/`;
    return this.http.get<Topic[]>(url); // без авторизации
  }

  // ... и т.д. - если нужны другие эндпоинты
  getCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`/api/courses/public-courses/${courseId}/`);
  }

  submitTest(testId: number, answersArray: { question_id: number; answer_id: number }[]) {
    return this.http.post(`/api/courses/topics/${testId}/submit-test/`, { answers: answersArray });
  }

}
