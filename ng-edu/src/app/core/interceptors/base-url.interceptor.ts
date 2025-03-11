import { HttpInterceptorFn } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
import { environment } from '../../../environments/environment.prod';

export const BaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const BASE_URL = environment.BASE_URL;

  // Если URL уже содержит BASE_URL, пропускаем его
  if (req.url.startsWith(BASE_URL)) {
    return next(req);
  }

  // Добавляем BASE_URL к URL запроса
  const modifiedReq = req.clone({
    url: `${BASE_URL}${req.url}`,
  });

  return next(modifiedReq);
};
