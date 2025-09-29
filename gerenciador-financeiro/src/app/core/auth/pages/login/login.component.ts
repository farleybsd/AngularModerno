import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  imports: [MatCardModule,MatFormFieldModule, MatInputModule, FormsModule,
            ReactiveFormsModule, MatButton, MatButtonModule,
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService = inject(AuthService);

  form = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  submint() {

    if(this.form.invalid) {
      return;
    }

    const payload = {
      user: this.form.value.user as string,
      password: this.form.value.password  as string
    }
    this.authService.login(payload).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
