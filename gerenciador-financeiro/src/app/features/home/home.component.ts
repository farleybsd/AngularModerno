import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationDialogServicesService } from '@shared/dialog/confirmation/services/confirmation-dialog.services.ts.service';
import { FeddbackServiceTsService } from '@shared/feedback/services/feddback.service.ts.service';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { TransactionService } from '@shared/transaction/services/transaction';
import { Balance } from './components/balance/balance';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { PieChartConfig } from './components/pie-chart/pie-chart-config.interface';
import { TransactionType } from '@shared/transaction/enums/transaction-type';

@Component({
  selector: 'app-list',
  imports: [Balance, PieChartComponent
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

  totalIncome = computed(() => {
    return this.transactions()
      .filter(item => item.type === TransactionType.INCOME)
      .reduce((total, item) => total + item.value, 0);
  });

  totalOutcome = computed(() => {
    return this.transactions()
      .filter(item => item.type === TransactionType.OUTCOME)
      .reduce((total, item) => total + item.value, 0);
  });


  chartConfig = computed<PieChartConfig>(() => {
    return { 
      labels: ['Ganhos', 'Gastos'],
      dataLabel: 'Valor Total',
      data: [this.totalIncome(),this.totalOutcome()] }
  })

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

