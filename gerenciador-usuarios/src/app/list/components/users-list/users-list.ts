import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  imports: [FormsModule],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss'
})
export class UsersList {


 users = input.required<string[]>();
 removerUser = output<string>({alias: 'remover'});

 remover(user : string) {
   this.removerUser.emit(user);
 }

}
