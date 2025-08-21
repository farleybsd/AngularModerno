import { Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Transaction } from '../../../../shared/transaction/interfaces/transaction';

@Component({
  selector: 'app-transaction-item',
  imports: [MatCardModule,MatButton],
  templateUrl: './transaction-item.html',
  styleUrl: './transaction-item.scss'
})
export class TransactionItem {

  transaction = input.required<Transaction>();

}
