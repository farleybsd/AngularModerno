import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MobileLayoutService } from '@core/layout/services/mobile-layout.service';
import { SidenavVisibilityStore } from '@core/layout/stores/sidenav-visibility.store';

@Component({
  selector: 'app-toogle-sidenav-visibility',
  imports: [MatButtonModule,MatIconModule],
  templateUrl: './toogle-sidenav-visibility.component.html',
  styleUrl: './toogle-sidenav-visibility.component.scss'
})
export class ToogleSidenavVisibilityComponent {

  private readonly sidenavVisibilityStore = inject(SidenavVisibilityStore);
  private readonly mobileLayoutService = inject(MobileLayoutService);

  isMobile = this.mobileLayoutService.isMobile();

  toogleVisibility() {
    this.sidenavVisibilityStore.toogle();
  }
}
