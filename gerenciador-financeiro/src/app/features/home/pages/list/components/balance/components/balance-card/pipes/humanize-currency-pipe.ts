import { formatCurrency } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

const suffixes = ['k', 'M', 'B', 'T'];

@Pipe({
  name: 'humanizeCurrency'
})
export class HumanizeCurrencyPipe implements PipeTransform {

  private readonly currencyCode = inject(DEFAULT_CURRENCY_CODE);
  private readonly localeId = inject(LOCALE_ID);

  transform(value: number): string {

    const formattedValue = formatCurrency(value, this.localeId, this.getCurrencySymbol());
    const splittedvalue = formattedValue.split('.')

    if (splittedvalue.length === 1) {
      return splittedvalue[0];
    }

    return this.formartValueWithSuffix(splittedvalue);

  }

  private formartValueWithSuffix(splittedvalue: string[]): string {
    const suffix = this.getSuffix(splittedvalue);
    const [firstValue, secondValue] = splittedvalue;
    const firstChasrOfSecondValue = secondValue.charAt(0);

    if (firstChasrOfSecondValue === '0') {
      return `${firstValue}${suffix}`;
    }

    return `${firstValue}.${firstChasrOfSecondValue}${suffix}`;
  }

  private getCurrencySymbol() {
    const { value } = new Intl.NumberFormat(this.localeId, {
      style: 'currency',
      currency: this.currencyCode,
    }).formatToParts().find(part => part.type === 'currency')!;

    return value;
  }

  private getSuffix(splittedvalue: string[]) {
    return suffixes[splittedvalue.length - 2];
  }

}
