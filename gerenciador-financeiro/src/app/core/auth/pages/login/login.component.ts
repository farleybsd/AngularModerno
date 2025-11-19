import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserCredentials } from '../../interfaces/user-credentials';
import { LoginFacadeService } from '../../facades/login-facade.service';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, FormsModule,
    ReactiveFormsModule, MatButton, MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  private readonly loginFacadeService = inject(LoginFacadeService);

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
    this.loginFacadeService.login(payload)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['']);
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
