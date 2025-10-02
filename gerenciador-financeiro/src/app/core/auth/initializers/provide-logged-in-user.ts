import { inject, provideAppInitializer } from "@angular/core";
import { AuthTokenStorageService } from "../service/auth-token-storage.service";
import { of, switchMap, tap } from "rxjs";
import { AuthService } from "../service/auth.service";
import { LoggedInUserStoreService } from "../stores/logged-in-user-store.service";

export function provideLoggedInUser() {
    return provideAppInitializer(() => {

        const authTokenStorageService = inject(AuthTokenStorageService);

        if (!authTokenStorageService.has()) {
            return of();
        }

        const authService = inject(AuthService);
        const loggedInUserStoreService = inject(LoggedInUserStoreService);
        
        const token = authTokenStorageService.get() as string;

        return authService.refreshToken(token)
            .pipe(
                tap((res) => authTokenStorageService.set(res.token)),
                switchMap((res) => authService.getCurrentUser(res.token)),
                tap((user) => loggedInUserStoreService.set(user))
            )
    });
}