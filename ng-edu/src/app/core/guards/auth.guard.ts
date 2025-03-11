import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   // Проверяем, залогинен ли
  //   if (this.auth.isLoggedIn()) {
  //     return true;
  //   } else {
  //     // Если не залогинен, отправляем на /login
  //     return this.router.createUrlTree(['/login']);
  //   }
  // }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean | UrlTree {
    if (!this.auth.isLoggedIn()) {
      return this.router.createUrlTree(['/login']);
    }
    // Проверяем роль
    const requiredRole = next.data['role'] as string; // 'student' или 'curator', например
    if (requiredRole && this.auth.getUserRole() !== requiredRole) {
      // Если роль не совпадает, редирект
      return this.router.createUrlTree(['/home']);
    }
    return true;
  }

}
