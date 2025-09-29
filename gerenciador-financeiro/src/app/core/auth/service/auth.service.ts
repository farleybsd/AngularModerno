import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { UserCredentials } from '../interfaces/user-credentials';
import { AuthTokenResponse } from '../interfaces/auth-token-response';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(payload: UserCredentials): Observable<AuthTokenResponse> {

    if (payload.user === 'admin' && payload.password === '123') {
      return of({ token: 'fake-token' });
    }
    return throwError(() => new HttpResponse({ status: 401, statusText: 'Unauthorize' }));
  }

}
