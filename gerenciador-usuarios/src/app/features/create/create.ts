import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Users } from '../../shared/services/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule,],
  templateUrl: './create.html',
  styleUrl: './create.scss'
})
export class Create {

  userService = inject(Users);
   router = inject(Router);
  form = new FormGroup({
    name: new FormControl('', {validators: [Validators.required], nonNullable: true} ),
    
} );

  submit(){
    const user = this.form.controls.name.value;
    this.userService.Post({name:user}).subscribe(() => {
      alert('Usuario Criado com sucesso');
      this.form.reset();
      this.router.navigateByUrl('');
    })
  }

}