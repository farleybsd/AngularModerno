import { Directive, effect, input } from '@angular/core';

type ColorType = 'error';

@Directive({
  selector: '[matButton]'
})
export class CustomColorDirective {

  color = input<ColorType>(undefined, { alias: 'matButtonColor' });

  constructor() {

    effect(() => {
      if (this.color()) {
        console.log(`Button color set to: ${this.color()}`);
      }
    })

  }

}
