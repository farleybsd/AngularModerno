
import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Transaction } from "@shared/transaction/interfaces/transaction";
import { TransactionService } from "@shared/transaction/services/transaction";


export const getTransactionsResolver: ResolveFn<Transaction[]> = (route, state) => {
  const transactionsService = inject(TransactionService);
  return transactionsService.getAll();
}