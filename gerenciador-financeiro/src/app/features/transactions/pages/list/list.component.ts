import { Component, inject, input, linkedSignal, resource, signal } from '@angular/core';
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
import { firstValueFrom } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpParams, httpResource, HttpResourceRequest } from '@angular/common/http';

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

  // transactions = input.required<Transaction[]>();
  // items = linkedSignal(() => this.transactions());

  searchTerm = signal('')

  // Sem Rxjs
  // resourceRef = resource({
  //   params: () => {
  //     return {
  //       searchTerm: this.searchTerm()
  //     }
  //   },
  //   loader:({params: {searchTerm}}) => {
  //    return  firstValueFrom(this.transactionService.getAll(searchTerm))
  //   },
  //   defaultValue: []
  // })

  // Rxjs ele cancela requisições antigas
  //   resourceRef = rxResource({
  //   params: () => {
  //     return {
  //       searchTerm: this.searchTerm()
  //     }
  //   },
  //   stream:({params: {searchTerm}}) => {
  //    return  this.transactionService.getAll(searchTerm)
  //   },
  //   defaultValue: []
  // })

  // ngOnInit(): void {
  //   this.getTraansactions();
  // }

  resourceRef = this.transactionService.getAllWitchHttpResource(this.searchTerm);

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
    this.resourceRef.update(transactions => {
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

