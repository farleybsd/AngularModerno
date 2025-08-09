import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Users {
  
  getAll(){
    return of(['Farley', 'Thalita', 'Enock', 'Marcia'])
           .pipe(delay(1000));
  }

}
