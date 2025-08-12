import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';

import { SearchInput } from './components/search-input/search-input';
import { UsersList } from './components/users-list/users-list';
import { User } from '../../shared/interface/usuario';
import { Users } from '../../shared/services/users';

import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list',
  template: `
  <app-search-input [(search)]="search"/>

  @if (isLoading()) {
    <p>Carregando...</p>
  } @else {
  <app-users-list [users]="users()" (remover)="remove($event)"/>
}`,
  imports: [SearchInput, UsersList]
})

export class List implements OnInit {

  constructor() {
    // Efect
    effect(() => {
      this.isLoading.set(true);
      this.getUsers();
    });
  }
  DestroyRef = inject(DestroyRef);
  userService = inject(Users);
  users = signal<User[]>([]);
  search = signal('');
  isLoading = signal(true);
  //searchInLowrCase= computed(() => this.search().toLocaleLowerCase());
  // Toda fez que o sinal emitir um sinal essa funcao computed e executada
  // e o valor atualizado
  // filteredUsers = computed(() => {
  //  return this.users().filter(user => user.name.toLocaleLowerCase()
  //                                         .includes(this.searchInLowrCase()));
  // });

  ngOnInit(): void {
    this.getUsers();
  }

  remove({ id }: User) {

    this.userService.delete(id).subscribe(() => {
      this.users.update(users => users.filter(u => u.id != id));
    });
  }

  private getUsers() {
    this.userService.getAll(this.search())
                    .pipe(
                      takeUntilDestroyed(this.DestroyRef), // Destrói o efeito quando o componente é destruído
                      take(1) // Pega apenas o primeiro valor emitido
                    )
                    .subscribe(users => {
      this.users.set(users);
      this.isLoading.set(false);
    });
  }
}