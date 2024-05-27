import { Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'clientes',
        pathMatch: 'full'
    },
    {
        path: 'clientes',
        loadChildren: () => import('./pages/clientes/clientes.module').then(m => m.ClientesModule)
    },
    {
        path: '**',
        component: ErrorComponent
    }
];
