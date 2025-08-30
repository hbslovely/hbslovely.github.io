import { Routes } from '@angular/router';

export const ENTERTAINMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./entertainment.component').then(m => m.EntertainmentComponent),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        loadComponent: () => import('./pages/overview/overview.component').then(m => m.OverviewComponent)
      },
      {
        path: 'shopping',
        loadComponent: () => import('./pages/shopping/shopping.component').then(m => m.ShoppingComponent)
      },
      {
        path: 'theme-parks',
        loadComponent: () => import('./pages/theme-parks/theme-parks.component').then(m => m.ThemeParksComponent)
      },
      {
        path: 'nightlife',
        loadComponent: () => import('./pages/nightlife/nightlife.component').then(m => m.NightlifeComponent)
      },
      {
        path: 'cinemas',
        loadComponent: () => import('./pages/cinemas/cinemas.component').then(m => m.CinemasComponent)
      },
      {
        path: 'sports',
        loadComponent: () => import('./pages/sports/sports.component').then(m => m.SportsComponent)
      }
    ]
  }
]; 