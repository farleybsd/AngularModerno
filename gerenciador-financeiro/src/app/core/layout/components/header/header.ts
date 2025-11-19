import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ToogleSidenavVisibilityComponent } from './toogle-sidenav-visibility/toogle-sidenav-visibility.component';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule,ToogleSidenavVisibilityComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {

  
}
