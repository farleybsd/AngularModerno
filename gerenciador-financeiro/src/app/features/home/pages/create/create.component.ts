import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TransactionType } from '../../../../shared/transaction/enums/transaction-type';
import { NgxMaskDirective } from 'ngx-mask';
import { TransactionService } from '../../../../shared/transaction/services/transaction';
import { TransactionPayload } from '../../../../shared/transaction/interfaces/transaction';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeddbackServiceTsService } from '../../../../shared/feedback/services/feddback.service.ts.service';


@Component({
  selector: 'app-create',
  imports: [MatFormFieldModule, MatInputModule, FormsModule,
            ReactiveFormsModule, MatButton,MatButtonModule,
            MatButtonToggleModule,NgxMaskDirective],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  private activatedRoute = inject(ActivatedRoute);
  private transactionService = inject(TransactionService);
  private feddbackServiceTsService = inject(FeddbackServiceTsService);
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  readonly transactionType = TransactionType;


  ngOnInit(): void {
    const transaction = this.activatedRoute.snapshot.data['transaction'];
    
    if(transaction){
      this.form.patchValue({
        title: transaction.title,
        type: transaction.type,
        value: transaction.value
      });
    }
  }

  form = new FormGroup({
    type: new FormControl('',{validators: [Validators.required]}),
    title: new FormControl('',{validators: [Validators.required]}),
    value: new FormControl(0,{validators: [Validators.required]})
  });

  submint(): void {
    if(this.form.invalid){
      return;
    } 

    const payload : TransactionPayload = {
      title: this.form.value.title as string,
      type: this.form.value.type as TransactionType,
      value: this.form.value.value as number 
    };

    this.transactionService.post(payload).subscribe({
      next: () => {
        this.feddbackServiceTsService.success('Transacao Criando Com Sucesso'); 
        this.router.navigate(['/']);
      }
  });
  
}

}
