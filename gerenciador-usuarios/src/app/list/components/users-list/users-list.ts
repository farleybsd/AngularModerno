import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-users-list',
  imports: [],
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
