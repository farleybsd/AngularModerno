import { Component, input, output } from '@angular/core';
import { User } from '../../../../shared/interface/usuario';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ErrorBtn } from './directives/error-btn/error-btn';
import { TitleCasePipe } from '@angular/common';
import { TruncatePipe } from './pipes/truncate/truncate-pipe';
@Component({
  selector: 'app-users-list',
  imports: [MatCardModule,MatButtonModule,ErrorBtn,TitleCasePipe,TruncatePipe],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss'
})
export class UsersList {


 users = input.required<User[]>();
 removerUser = output<User>({alias: 'remover'});
 editUser = output<User>({alias: 'edit'});

 remover(user : User) {
   this.removerUser.emit(user);
 }

  edit(user : User) {
   this.editUser.emit(user);
 }

}
