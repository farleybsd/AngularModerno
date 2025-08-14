import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Users } from '../../shared/services/users';
import { User } from '../../shared/interface/usuario';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    RouterLink],
  templateUrl: './edit.html',
  styleUrl: './edit.scss'
})
export class Edit implements OnInit {
  userService = inject(Users);
  router = inject(Router);
  form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required], nonNullable: true }),

  });
  activatedRoute = inject(ActivatedRoute);
  user = input.required<User>();
  //user = signal<User>(this.activatedRoute.snapshot.data['user']);

 ngOnInit(): void {
  this.form.controls.name.setValue(this.user().name);
  }
  
  submit() {
    const user = this.form.controls.name.value;
    this.userService.put(this.user().id,{ name: user }).subscribe(() => {
      alert('Usuario Atualizado com sucesso');
      this.form.reset();
      this.router.navigateByUrl('');
    })
  }

}
