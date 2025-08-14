import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'discover',
    loadChildren: () => import('./pages/discover/discover.routes').then(m => m.DISCOVER_ROUTES)
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/legal/privacy/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/legal/terms/terms.component').then(m => m.TermsComponent)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
