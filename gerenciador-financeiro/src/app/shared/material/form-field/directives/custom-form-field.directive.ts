import { Directive } from '@angular/core';
import { FullWidthDirective } from './full-width.directive';
import { MarginBottomDirective } from './margin-bottom.directive';

// Sempre que existir essa tag mat-form-field ele vai aplicar as diretivas filhas[FullWidthDirective, MarginBottomDirective]

@Directive({
  selector: 'mat-form-field',
  hostDirectives: [
    {
      directive:FullWidthDirective,
      inputs: ['appFullWidth']
    },
    {
       directive:MarginBottomDirective,
      inputs: ['appMarginBottom:mb']
    }
  ]
})
export class CustomFormFieldDirective {}
