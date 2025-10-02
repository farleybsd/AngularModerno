import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoggedInUserStoreService } from '../stores/logged-in-user-store.service';
import { AuthTokenStorageService } from '../service/auth-token-storage.service';

export const setAuthTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const loggedInUserStoreService = inject(LoggedInUserStoreService);

  if (!loggedInUserStoreService.isLoggedIn()) {
    return next(req);
  }

  const token = inject(AuthTokenStorageService);

  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token.get()}`
    }
  });

  return next(newReq);
};
