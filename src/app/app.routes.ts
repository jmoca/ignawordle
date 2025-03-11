import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
    },
    {
        path: 'inicio',
        loadComponent: () => import('./inicio/inicio.component').then((m) => m.InicioComponent),
    },
    {
        path: 'select-level',
        loadComponent: () => import('./select-level/select-level.component').then((m) => m.SelectLevelComponent),
    },
    {
        path: 'guess-word',
        loadComponent: () => import('./guess-word/guess-word.component').then((m) => m.GuessWordComponent),
    }
];
