import { ResolveFn } from '@angular/router';
import { TransactionService } from '../../../../../shared/transaction/services/transaction';
import { inject } from '@angular/core';
import { Transaction } from '../../../../../shared/transaction/interfaces/transaction';

export const getTransactionsResolver: ResolveFn<Transaction[]> = (route, state) => {
const  transactionService = inject(TransactionService);
 return transactionService.getAll()
};
