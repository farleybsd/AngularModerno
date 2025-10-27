import { Component, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidenav-items',
  imports: [MatListModule,RouterLink,RouterLinkActive],
  templateUrl: './sidenav-items.component.html',
  styleUrl: './sidenav-items.component.scss'
})
export class SidenavItemsComponent {
  links =  signal([
    {
      label:'Home',
      url:'/'
    }
  ])
}
