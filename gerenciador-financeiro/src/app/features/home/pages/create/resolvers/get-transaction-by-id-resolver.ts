import { ResolveFn } from '@angular/router';

import { inject } from '@angular/core';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { TransactionService } from '@shared/transaction/services/transaction';


export const getTransactionByIdResolver: ResolveFn<Transaction> = (route, state) => {
 
  const transactionService = inject(TransactionService);
  const id = route.paramMap.get('id') as string;
  return transactionService.getById(id);
};
