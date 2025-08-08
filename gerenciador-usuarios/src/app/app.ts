import { Component, signal } from '@angular/core';
import { UsersList } from './list/components/users-list/users-list';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [UsersList],
})
export class App {
   users = signal(['Farley','Thalita','Enock','Marcia'])

   remove(user:string){
    this.users.update(users => users.filter(u => u != user));
   }
}
