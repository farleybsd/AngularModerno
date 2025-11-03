import { formatNumber } from '@angular/common';
import { LOCALE_ID, Pipe, PipeTransform, inject } from '@angular/core';

@Pipe({ name: 'humanizeCurrency', standalone: true })
export class HumanizeCurrencyPipe implements PipeTransform {
  private readonly locale = inject(LOCALE_ID);

  // Convenção padrão: k=10^3, M=10^6, B=10^9, T=10^12
  private readonly UNITS = [
    { value: 1e12, suffix: 'T' },
    { value: 1e9,  suffix: 'B' },
    { value: 1e6,  suffix: 'M' },
    { value: 1e3,  suffix: 'k' },
  ];

  transform(value: number | null | undefined): string {
    if (value == null || isNaN(value as number)) return '';

    const abs = Math.abs(value);

    // Menor que mil → 2 casas decimais
    if (abs < 1_000) {
      return formatNumber(value, this.locale, '1.2-2');
    }

    // Acha a maior unidade aplicável
    const unit = this.UNITS.find(u => abs >= u.value)!;
    const num = value / unit.value;

    // Formata com no máx. 1 casa
    let formatted = formatNumber(num, this.locale, '1.0-1');

    // Remove .0 ou ,0 final respeitando o locale
    const decimalSep = new Intl.NumberFormat(this.locale)
      .formatToParts(1.1)
      .find(p => p.type === 'decimal')?.value ?? '.';

    const trailingZero = decimalSep + '0';
    if (formatted.endsWith(trailingZero)) {
      formatted = formatted.slice(0, -trailingZero.length);
    }

    return `${formatted}${unit.suffix}`;
  }
}
