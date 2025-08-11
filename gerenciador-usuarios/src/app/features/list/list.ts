import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { SearchInput } from './components/search-input/search-input';
import { UsersList } from './components/users-list/users-list';
import { User } from '../../shared/models/usuario';
import { Users } from '../../shared/services/users';

@Component({
    selector: 'app-list',
    template: `
@if (isLoading()) {
  <p>Carregando...</p>
} @else {
  <app-search-input [(search)]="search"/>
  <app-users-list [users]="filteredUsers()" (remover)="remove($event)"/>
}`,
    imports: [SearchInput, UsersList]
})

export class List implements OnInit {
    constructor() { }

   userService = inject(Users);

   users = signal<User[]>([]);
   search = signal('');
   searchInLowrCase= computed(() => this.search().toLocaleLowerCase());
   isLoading = signal(true);
  
  // Toda fez que o sinal emitir um sinal essa funcao computed e executada
  // e o valor atualizado
  filteredUsers = computed(() => {
   return this.users().filter(user => user.name.toLocaleLowerCase()
                                          .includes(this.searchInLowrCase()));
  });

  ngOnInit(): void {
    this.userService.getAll().subscribe(users => {
      this.users.set(users);
      this.isLoading.set(false);
    });
  }
   remove(user:string){
    this.users.update(users => users.filter(u => u.name != user));
   }
}