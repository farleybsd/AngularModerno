import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-transaction-item',
  imports: [MatCardModule,MatButton],
  templateUrl: './transaction-item.html',
  styleUrl: './transaction-item.scss'
})
export class TransactionItem {

}
