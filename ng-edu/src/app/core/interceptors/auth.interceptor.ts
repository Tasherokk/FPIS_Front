import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error) => {
      // Если ошибка 401, пробуем обновить токен
      if (error.status === 401) {
        return authService.refreshAccessToken().pipe(
          switchMap((newToken) => {
            if (newToken) {
              // Повторяем запрос с новым токеном
              const clonedRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`,
                },
              });
              return next(clonedRequest);
            }
            return throwError(error);
          })
        );
      }
      return throwError(error);
    })
  );
};
