import { inject, Injectable } from '@angular/core';
import { LocalStorageToken } from '../tokens/local-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenStorageService {

  private readonly Key : string = 'auth-token';

  localStorageToken = inject(LocalStorageToken);

  set(token:string){
    this.localStorageToken.setItem(this.Key, token);
  }
  
}
