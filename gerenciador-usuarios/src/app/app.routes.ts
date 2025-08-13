import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: 'list',
        loadChildren: () => import('./features/list/routes').then((m) => m.routes)
    },
    {
        path: 'create',
        loadChildren: () => import('./features/create/routes').then((m) => m.routes),
    },
    {
        path: 'edit/:id',
        loadChildren: () => import('./features/edit/routes').then((m) => m.routes),
    },
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    }
];
