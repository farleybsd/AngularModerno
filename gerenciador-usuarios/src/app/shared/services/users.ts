import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { User, UserPayload } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class Users {
  httpClient = inject(HttpClient)
  getAll(){
    return this.httpClient.get<User[]>('http://localhost:3000/users');
  }

  Post(paylod:UserPayload){
    return this.httpClient.post<User[]>('http://localhost:3000/users',paylod);
  }
  
}
