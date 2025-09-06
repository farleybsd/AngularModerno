import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-create',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButton,MatButtonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  form = new FormGroup({
    title: new FormControl('',{validators: [Validators.required]}),
    value: new FormControl('',{validators: [Validators.required]})
  });
}
