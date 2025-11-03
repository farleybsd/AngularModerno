import { Component, inject, input, linkedSignal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { NoTransactions } from './components/no-transactions/no-transactions';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { TransationsContainerComponent } from './components/transations-container/transations-container.component';
import { ConfirmationDialogServicesService } from '@shared/dialog/confirmation/services/confirmation-dialog.services.ts.service';
import { FeddbackServiceTsService } from '@shared/feedback/services/feddback.service.ts.service';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { TransactionService } from '@shared/transaction/services/transaction';
import { SearchComponent } from './components/search/search.component';

@Component({
  selector: 'app-list',
  imports: [
    TransactionItem,
    NoTransactions,
    MatButtonModule,
    RouterLink,
    TransationsContainerComponent,
    SearchComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  private transactionService = inject(TransactionService);
  private feedback = inject(FeddbackServiceTsService);
  private router = inject(Router);
  private confirmationDialogServices = inject(ConfirmationDialogServicesService);
  private activatedRoute = inject(ActivatedRoute);

  transactions = input.required<Transaction[]>();
  items = linkedSignal(() => this.transactions());

  searchTerm = signal('')

  // ngOnInit(): void {
  //   this.getTraansactions();
  // }

  edit(transaction: Transaction) {
    this.router.navigate(['edit', transaction.id], { relativeTo: this.activatedRoute });
  }

  remove(transaction: Transaction) {
    this.confirmationDialogServices
      .open({
        title: 'Deletar Transação 💀',
        message: 'Voce Realmente quer deletar a transacao🚨?',
      })
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
    this.items.update(transactions => {
      return transactions.filter(item => item.id !== transaction.id);
    });
  }

  // private getTraansactions() {
  //   this.transactionService.getAll().subscribe({
  //     next: (trans) => {
  //       console.log('Received transactions:', trans);
  //       this.items.set(trans);
  //     },
  //     error: (error) => {
  //       console.error('Error fetching transactions:', error);
  //     }
  //   });
  // }

}

