import { inject, Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { AuthTokenStorageService } from '../service/auth-token-storage.service';
import { tap } from 'rxjs';
import { LoggedInUserStoreService } from '../stores/logged-in-user-store.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutFacadeService {

  private readonly authService = inject(AuthService);
  private readonly authTokenStorageService = inject(AuthTokenStorageService);
  private readonly loggedInUserStoreService = inject(LoggedInUserStoreService);

  logout() {
    return this.authService.logout()
      .pipe(
        tap(() => this.authTokenStorageService.remove()),
        tap(() => this.loggedInUserStoreService.logout())
      )
  }
}
