import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TransactionType } from '../../../../shared/transaction/enums/transaction-type';
import { NgxMaskDirective } from 'ngx-mask';
import { TransactionService } from '../../../../shared/transaction/services/transaction';
import { Transaction, TransactionPayload } from '../../../../shared/transaction/interfaces/transaction';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeddbackServiceTsService } from '../../../../shared/feedback/services/feddback.service.ts.service';
import { Observable, tap } from 'rxjs';
import { CustomFormFieldDirective } from '@shared/material/form-field/directives/custom-form-field.directive';


@Component({
  selector: 'app-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButton,
    MatButtonModule,
    MatButtonToggleModule,
    NgxMaskDirective,
    CustomFormFieldDirective],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {

  //private activatedRoute = inject(ActivatedRoute);
  private transactionService = inject(TransactionService);
  private feddbackServiceTsService = inject(FeddbackServiceTsService);
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);
  transaction = input<Transaction>();
  private activatedRoute = inject(ActivatedRoute);
  readonly transactionType = TransactionType;

  // get transaction(): Transaction {
  //   return this.activatedRoute.snapshot.data['transaction'];
  // }

  isEdit = computed(() => {
    return Boolean(this.transaction());
  })

  form = computed(() =>
    new FormGroup({
      type: new FormControl(this.transaction()?.type ?? '', { validators: [Validators.required] }),
      title: new FormControl(this.transaction()?.title ?? '', { validators: [Validators.required] }),
      value: new FormControl(this.transaction()?.value ?? 0, { validators: [Validators.required] })
    })
  );

  submint(): void {
    if (this.form().invalid) {
      return;
    }

    const payload: TransactionPayload = {
      title: this.form().value.title as string,
      type: this.form().value.type as TransactionType,
      value: this.form().value.value as number
    };

    if (this.isEdit()) {
        this.createOrEdit(payload).subscribe({
        next: () => {
          this.router.navigate(['/transactions'], { relativeTo: this.activatedRoute });
        }
      });
    } else {
      this.transactionService.post(payload).subscribe({
        next: () => {
          this.feddbackServiceTsService.success('Transacao Criando Com Sucesso');
          this.router.navigate(['/']);
        }
      });
    }
  }

  private createOrEdit(payload: TransactionPayload) : Observable<Transaction> {
    if (this.isEdit()) {
     return  this.transactionService
     .put(this.transaction()!.id, payload)
      .pipe(
          tap(() => this.feddbackServiceTsService.success('Transacao Alterada Com Sucesso'))
        )
    } else {
    return   this.transactionService
      .post(payload)
      .pipe(
        tap( () => this.feddbackServiceTsService.success('Transacao Criando Com Sucesso'))
      )
    }
  }

}
