import {  Routes } from "@angular/router";
import { Home } from "./home";
import { CreateComponent } from "./pages/create/create.component";
import { getTransactionByIdResolver } from "./pages/create/resolvers/get-transaction-by-id-resolver";

export default [
    {
        path: '',
        component: Home
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