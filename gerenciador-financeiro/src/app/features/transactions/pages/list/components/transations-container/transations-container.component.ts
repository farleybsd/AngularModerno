import { Component, contentChild, input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Transaction } from '../../../../../../shared/transaction/interfaces/transaction';

@Component({
  selector: 'app-transations-container',
  imports: [NgTemplateOutlet],
  templateUrl: './transations-container.component.html',
  styleUrl: './transations-container.component.scss'
})
export class TransationsContainerComponent {

  transactions = input.required<Transaction[]>();

  itemTemplate = contentChild.required<TemplateRef<unknown>>('item');
  noItemsTemplate = contentChild.required<TemplateRef<unknown>>('noItems');
}
