import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { BalanceCard } from './components/balance-card/balance-card';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { sumTransactions } from '@shared/transaction/functions/sum-transactions';
import { TransactionType } from '@shared/transaction/enums/transaction-type';

@Component({
  selector: 'app-balance',
  imports: [BalanceCard],
  templateUrl: './balance.html',
  styleUrl: './balance.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Balance {

  transactions = input.required<Transaction[]>();

  totalIncome = computed(() => {
    return sumTransactions(this.transactions(), TransactionType.INCOME);
  });

   totalOutcome = computed(() => {
    return sumTransactions(this.transactions(), TransactionType.OUTCOME);;
  });

  balance = computed(() =>{
    return this.totalIncome() - this.totalOutcome();
  })

}
