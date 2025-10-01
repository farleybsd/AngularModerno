import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserCredentials } from '../../interfaces/user-credentials';
import { AuthTokenStorageService } from '../../service/auth-token-storage.service';
import { LoggedInUserStoreService } from '../../stores/logged-in-user-store.service';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, FormsModule,
    ReactiveFormsModule, MatButton, MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService = inject(AuthService);
  authTokenStorageService = inject(AuthTokenStorageService);
  loggedInUserStoreService = inject(LoggedInUserStoreService);

  router = inject(Router);

  form = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  submint() {

    if (this.form.invalid) {
      return;
    }

    const payload: UserCredentials = {
      user: this.form.value.user as string,
      password: this.form.value.password as string
    }
    this.authService.login(payload).subscribe({
      next: (res) => {
        console.log(res);
        this.authTokenStorageService.set(res.token);
        this.authService.getCurrentUser(res.token).subscribe((user) => {
          this.loggedInUserStoreService.set(user);
          this.router.navigate(['']);
        });

      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.form.setErrors({
            wrongCredentials: true
          });
        }
      }
    });
  }

}
