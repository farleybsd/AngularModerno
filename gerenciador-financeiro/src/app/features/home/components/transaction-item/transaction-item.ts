import { Component, input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Transaction } from '../../../../shared/transaction/interfaces/transaction';
import { TransactionValue } from './components/transaction-value/transaction-value';

@Component({
  selector: 'app-transaction-item',
  imports: [MatCardModule,MatButton,TransactionValue],
  templateUrl: './transaction-item.html',
  styleUrl: './transaction-item.scss'
})
export class TransactionItem {

  transaction = input.required<Transaction>();
  edit = output<Transaction>();
  remove = output<Transaction>();
}
