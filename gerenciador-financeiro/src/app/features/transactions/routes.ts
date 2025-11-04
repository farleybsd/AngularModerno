import {  Routes } from "@angular/router";
import { CreateComponent } from "./pages/create/create.component";
import { getTransactionByIdResolver } from "./pages/create/resolvers/get-transaction-by-id-resolver";
import { ListComponent } from "./pages/list/list.component";
import { getTransactionsResolver } from "./pages/list/resolvers/get-transactions-resolver";

export default [
    {
        path: '',
        component: ListComponent,
        resolve: {
            //transactions: getTransactionsResolver
        }   
    },
    {
        path:'create',
        component:CreateComponent
    },
    {
        path:'edit/:id',
        component:CreateComponent,
        resolve: {
            transaction: getTransactionByIdResolver
        }   
    }
] as Routes;