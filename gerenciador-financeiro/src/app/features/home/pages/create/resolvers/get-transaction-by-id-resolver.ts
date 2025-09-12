import { ResolveFn } from '@angular/router';
import { Transaction } from '../../../../../shared/transaction/interfaces/transaction';
import { inject } from '@angular/core';
import { TransactionService } from '../../../../../shared/transaction/services/transaction';

export const getTransactionByIdResolver: ResolveFn<Transaction> = (route, state) => {
 
  const transactionService = inject(TransactionService);
  const id = route.paramMap.get('id') as string;
  return transactionService.getById(id);
};
