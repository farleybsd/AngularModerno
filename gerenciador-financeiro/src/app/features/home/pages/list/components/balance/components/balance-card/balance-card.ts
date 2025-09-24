import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

type CardType = 'income' | 'outcome' | 'balance';
enum CardTypeEnum {
  Income = 'income',
  Outcome = 'outcome',
  zero = 'zero'
}

@Component({
  selector: 'app-balance-card',
  imports: [MatCardModule],
  templateUrl: './balance-card.html',
  styleUrl: './balance-card.scss'
})
export class BalanceCard {

  type = input.required<CardType>();
  label = input.required<string>();
  value = input.required<number>();

  cssClass = computed<CardTypeEnum>(() => {
    
    if (this.type() === 'income') {
      return CardTypeEnum.Income;
    }

    if (this.type() === 'outcome') {
      return CardTypeEnum.Outcome;
    }

    if(this.value() == 0) {
      return CardTypeEnum.zero
    }

    return this.value () > 0 ? CardTypeEnum.Income : CardTypeEnum.Outcome;

  });

}
