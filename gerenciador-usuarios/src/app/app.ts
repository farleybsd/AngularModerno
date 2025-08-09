import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UsersList } from './list/components/users-list/users-list';
import { SearchInput } from './list/components/search-input/search-input';
import { Users } from './shared/services/users';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [UsersList,SearchInput],
})
export class App implements OnInit {

   userService = inject(Users);

   users = signal<string[]>([]);
   search = signal('');
   searchInLowrCase= computed(() => this.search().toLocaleLowerCase());
   isLoading = signal(true);
  
  // Toda fez que o sinal emitir um sinal essa funcao computed e executada
  // e o valor atualizado
  filteredUsers = computed(() => {
   return this.users().filter(user => user.toLocaleLowerCase()
                                          .includes(this.searchInLowrCase()));
  });

  ngOnInit(): void {
    this.userService.getAll().subscribe(users => {
      this.users.set(users);
      this.isLoading.set(false);
    });
  }
   remove(user:string){
    this.users.update(users => users.filter(u => u != user));
   }
}
