import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LogoutFacadeService } from '../../../auth/facades/logout-facade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule,MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  private readonly logoutFacadeService = inject(LogoutFacadeService);
  private readonly router = inject(Router);

  logout() {
    this.logoutFacadeService.logout().subscribe({
      next: () => {this.router.navigate(['/auth/login'])},
      error: (error) => console.error('Logout error', error)
    });
  }
}
