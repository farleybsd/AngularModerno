import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HumanizeCurrencyPipe } from './pipes/humanize-currency-pipe';

type CardType = 'income' | 'outcome' | 'balance';
enum CardTypeEnum {
  Income = 'income',
  Outcome = 'outcome',
  zero = 'zero'
}

@Component({
  selector: 'app-balance-card',
  imports: [MatCardModule,HumanizeCurrencyPipe],
  templateUrl: './balance-card.html',
  styleUrl: './balance-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
