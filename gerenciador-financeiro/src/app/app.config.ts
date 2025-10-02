import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideCore } from './core/provide-core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    // provideHttpClient(withInterceptors([setAuthTokenInterceptor])),
    // provideEnvironmentNgxMask({
    //   thousandSeparator: ".",
    //   decimalMarker: ","
    // }),
    // {
    //   provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    //   useValue: {
    //     duration: 3000,
    //     horizontalPosition: 'center',
    //     verticalPosition: 'top',
    //   } as MatSnackBarConfig,
    // },
    //provideLoggedInUser()
    provideCore(),
  ]
};
