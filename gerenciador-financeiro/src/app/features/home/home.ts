import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { Transaction } from '../../shared/transaction/interfaces/transaction';
import { NoTransactions } from './components/no-transactions/no-transactions';
import { TransactionService } from '../../shared/transaction/services/transaction';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { FeddbackServiceTsService } from '../../shared/feedback/services/feddback.service.ts.service';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { filter } from 'rxjs';

@Component({
  selector: 'dialog-animations-example-dialog',
  template: `<h2 mat-dialog-title>Deletar Transacao</h2>
<mat-dialog-content>
  Voce tem certeza que deseja deletar essa transacao?
</mat-dialog-content>
<mat-dialog-actions>
  <button matButton [mat-dialog-close]="false">Nao</button>
  <button matButton [mat-dialog-close]="true" cdkFocusInitial>Sim</button>
</mat-dialog-actions>
`,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAnimationsExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogAnimationsExampleDialog>);
}

@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem, NoTransactions, MatButtonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {


  private transactionService = inject(TransactionService);
  private feedback = inject(FeddbackServiceTsService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  transactions = signal<Transaction[]>([]);

  ngOnInit(): void {
    this.getTraansactions();
  }

  edit(transaction: Transaction) {
    this.router.navigate(['edit', transaction.id]);
  }

  remove(transaction: Transaction) {
    this.dialog.open(DialogAnimationsExampleDialog, {
    }).afterClosed()
      .pipe(filter((result: boolean) => result === true))
      .subscribe(() => {  // Removemos o parâmetro result pois já filtramos com pipe
        this.transactionService.delete(transaction.id).subscribe({
          next: () => {
            this.removeTransactionFromArray(transaction);
            this.feedback.success('Transaction removed successfully👌!');
          }
        });
      });

  }

  private removeTransactionFromArray(transaction: Transaction) {
    this.transactions.update(transactions => {
      return transactions.filter(item => item.id !== transaction.id);
    });
  }

  private getTraansactions() {
    this.transactionService.getAll().subscribe({
      next: (trans) => {
        console.log('Received transactions:', trans);
        this.transactions.set(trans);
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    });
  }

}
