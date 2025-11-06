import { Component, computed, input, signal } from '@angular/core';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { Balance } from './components/balance/balance';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { PieChartConfig } from './components/pie-chart/pie-chart-config.interface';
import { TransactionType } from '@shared/transaction/enums/transaction-type';
import { sumTransactions } from '@shared/transaction/functions/sum-transactions';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-list',
  imports: [Balance,
            PieChartComponent,
            MatCardModule,
            MatButtonModule,
            MatProgressBarModule,
            MatIconModule
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
  canLoadComponente = signal(false);

  totalIncome = computed(() => {
    return sumTransactions(this.transactions(), TransactionType.INCOME);
  });

  totalOutcome = computed(() => {
    return sumTransactions(this.transactions(), TransactionType.OUTCOME);
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

