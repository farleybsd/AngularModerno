import { Routes } from '@angular/router';
import { ListComponent } from './features/list/components/list';

export const routes: Routes = [
    {
        path: 'list',
        component: ListComponent, // Replace with actual component
    }, 
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    }
];
