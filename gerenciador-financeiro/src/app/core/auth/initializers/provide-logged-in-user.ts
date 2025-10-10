import { inject, provideAppInitializer } from "@angular/core";
import { AuthTokenStorageService } from "../service/auth-token-storage.service";
import { of } from "rxjs";
import { LoginFacadeService } from "../facades/login-facade.service";

export function provideLoggedInUser() {
    return provideAppInitializer(() => {

        const authTokenStorageService = inject(AuthTokenStorageService);

        if (!authTokenStorageService.has()) {
            return of();
        }

        const token = authTokenStorageService.get() as string;
        const loginFacadeService = inject(LoginFacadeService);

        return loginFacadeService.refreshToken(token);
    });
}