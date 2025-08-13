import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User, UserPayload } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class Users {

  httpClient = inject(HttpClient)

  getById(id: string) {
    return this.httpClient.get<User>(`http://localhost:3000/users/${id}`);
  }
  getAll(search?: string) {

    let httpParams = new HttpParams();

    if (search) {
      httpParams = httpParams.append('q', search);
    }
   
    return this.httpClient.get<User[]>('http://localhost:3000/users',{
      params: httpParams
    });
    
  }

  Post(paylod:UserPayload){
    return this.httpClient.post<User[]>('http://localhost:3000/users',paylod);
  }

  put(id: string, payload: UserPayload) {
    return this.httpClient.put<User>(`http://localhost:3000/users/${id}`, payload);
  }
  
  delete(id:number){
    return this.httpClient.delete<{}>(`http://localhost:3000/users/${id}`);
  }
  
}
