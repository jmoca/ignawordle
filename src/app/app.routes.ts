import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'select-level',
    pathMatch: 'full',
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
