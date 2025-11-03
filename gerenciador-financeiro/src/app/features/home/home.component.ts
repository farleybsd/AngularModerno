import { Component, inject, input, linkedSignal } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationDialogServicesService } from '@shared/dialog/confirmation/services/confirmation-dialog.services.ts.service';
import { FeddbackServiceTsService } from '@shared/feedback/services/feddback.service.ts.service';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { TransactionService } from '@shared/transaction/services/transaction';
import { Balance } from './components/balance/balance';

@Component({
  selector: 'app-list',
  imports: [Balance,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  // private transactionService = inject(TransactionService);
  // private feedback = inject(FeddbackServiceTsService);
  // private router = inject(Router);
  // private confirmationDialogServices = inject(ConfirmationDialogServicesService);

  transactions = input.required<Transaction[]>();
  
  //items = linkedSignal(() => this.transactions());

  // ngOnInit(): void {
  //   this.getTraansactions();
  // }

  // edit(transaction: Transaction) {
  //   this.router.navigate(['edit', transaction.id]);
  // }

  // remove(transaction: Transaction) {
  //   this.confirmationDialogServices
  //     .open({
  //       title: 'Deletar Transação 💀',
  //       message: 'Voce Realmente quer deletar a transacao🚨?',
  //     })
  //     .subscribe(() => {  // Removemos o parâmetro result pois já filtramos com pipe
  //       this.transactionService.delete(transaction.id).subscribe({
  //         next: () => {
  //           this.removeTransactionFromArray(transaction);
  //           this.feedback.success('Transaction removed successfully👌!');
  //         }
  //       });
  //     });

  // }

  // private removeTransactionFromArray(transaction: Transaction) {
  //   this.items.update(transactions => {
  //     return transactions.filter(item => item.id !== transaction.id);
  //   });
  // }

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

