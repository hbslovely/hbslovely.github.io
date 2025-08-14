import { Routes } from '@angular/router';

export const DISCOVER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./discover.component').then(m => m.DiscoverComponent),
    children: [
      {
        path: 'wards',
        loadComponent: () => import('./pages/wards/wards.component').then(m => m.WardsComponent)
      },
      {
        path: 'food',
        loadComponent: () => import('./pages/food/food.component').then(m => m.FoodComponent)
      },
      {
        path: 'culture',
        loadComponent: () => import('./pages/culture/culture.component').then(m => m.CultureComponent)
      },
      {
        path: 'tips',
        loadComponent: () => import('./pages/tips/tips.component').then(m => m.TipsComponent)
      },
      {
        path: '',
        redirectTo: 'wards',
        pathMatch: 'full'
      }
    ]
  }
]; 