import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../../shared/interface/usuario';

@Component({
  selector: 'app-users-list',
  imports: [FormsModule],
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
