import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';

// Пример ответа от бэкенда при логине (Django + SimpleJWT)
interface AuthResponse {
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private accessToken: string | null = localStorage.getItem('accessToken');
  private refreshToken: string | null = localStorage.getItem('refreshToken');

  constructor(private http: HttpClient) {}

  // Метод для логина
  login(username: string, password: string): Observable<boolean> {
    const url = '/api/token/';
    return this.http.post<AuthResponse>(url, { username, password }).pipe(
      tap((res) => this.saveTokens(res)),
      switchMap(() =>
        this.fetchUserInfo().pipe(
          tap((user) => this.saveUserData(user)),
          map(() => true)
        )
      )
    );
  }

  // Получение информации о пользователе
  fetchUserInfo(): Observable<any> {
    const url = '/api/courses/user/me/';
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  // Обновление токена
  refreshAccessToken(): Observable<string | null> {
    const url = '/api/token/refresh/';
    if (!this.refreshToken) {
      return of(null);
    }
    return this.http.post<{ access: string }>(url, { refresh: this.refreshToken }).pipe(
      tap((res) => {
        this.accessToken = res.access;
        localStorage.setItem('accessToken', res.access);
      }),
      map((res) => res.access),
      tap({
        error: () => this.logout(),
      })
    );
  }

  // Метод для выхода
  logout(): void {
    this.clearLocalStorage();
    this.accessToken = null;
    this.refreshToken = null;
  }

  // Проверка авторизации
  isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  // Получение роли пользователя
  getUserRole(): string | null {
    const userData = this.getUserData();
    return userData?.role || null;
  }

  // Получение всех данных пользователя
  getUserData(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  // Получение заголовков с токеном
  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });
  }

  // Сохранение токенов в localStorage
  private saveTokens({ access, refresh }: AuthResponse): void {
    this.accessToken = access;
    this.refreshToken = refresh;
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
  }

  // Сохранение данных пользователя в localStorage
  private saveUserData(user: any): void {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  // Очистка localStorage
  private clearLocalStorage(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');
  }
}
