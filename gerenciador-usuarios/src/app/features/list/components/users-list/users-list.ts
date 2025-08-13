import { Component, input, output } from '@angular/core';
import { User } from '../../../../shared/interface/usuario';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users-list',
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss'
})
export class UsersList {


 users = input.required<User[]>();
 removerUser = output<User>({alias: 'remover'});

 remover(user : User) {
   this.removerUser.emit(user);
 }

}
