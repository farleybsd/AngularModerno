import { Directive, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutFacadeService } from '../../../../auth/facades/logout-facade.service';

@Directive({
  selector: '[appLogout]',
  host:{
    '(click)': 'logout()'
  }
})
export class LogoutDirective {
  private readonly logoutFacadeService = inject(LogoutFacadeService);
  private readonly router = inject(Router);

  constructor() { }

   logout() {
    this.logoutFacadeService.logout().subscribe({
      next: () => {this.router.navigate(['/auth/login'])},
      error: (error) => console.error('Logout error', error)
    });
  }
}
