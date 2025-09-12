import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class FeddbackServiceTsService {

  private _snackBar = inject(MatSnackBar);

  success(message: string): void {
    this._snackBar.open(`${message} ❤️`, 'Ok', {
      panelClass: ['snack-bar-success-feedback']
    });
  }
}
