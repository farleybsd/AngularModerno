import { Component, input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { TransactionValue } from './components/transaction-value/transaction-value';
import { Transaction } from '../../../../../../shared/transaction/interfaces/transaction';
import { CustomColorDirective } from '@shared/material/buttons/directives/custom-color.directive';
import { IsIncomeDirective } from './directives/is-income.directive';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-transaction-item',
  imports: [
    MatCardModule,
    MatButton,
    TransactionValue,
    CustomColorDirective,
    IsIncomeDirective,
    MatChipsModule
  ],
  templateUrl: './transaction-item.html',
  styleUrl: './transaction-item.scss'
})
export class TransactionItem {

  transaction = input.required<Transaction>();
  edit = output<Transaction>();
  remove = output<Transaction>();
}
