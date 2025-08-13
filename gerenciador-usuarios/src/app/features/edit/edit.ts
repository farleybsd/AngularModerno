import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Users } from '../../shared/services/users';

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
  id = signal<string>(this.activatedRoute.snapshot.paramMap.get('id')!);
  idAsString =  computed(() => this.id());

 ngOnInit(): void {
    this.userService.getById(this.idAsString()).subscribe(user => {
      this.form.controls.name.setValue(user.name);
    });
  }
  
  submit() {
    const user = this.form.controls.name.value;
    this.userService.put(this.idAsString(),{ name: user }).subscribe(() => {
      alert('Usuario Atualizado com sucesso');
      this.form.reset();
      this.router.navigateByUrl('');
    })
  }

}
