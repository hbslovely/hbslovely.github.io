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
    path: 'search',
    loadComponent: () => import('./pages/search/search.component').then(m => m.SearchComponent)
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/legal/privacy/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: 'travel-tips',
    loadComponent: () => import('./pages/discover/pages/tips/tips.component').then(m => m.TipsComponent)
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/legal/terms/terms.component').then(m => m.TermsComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
