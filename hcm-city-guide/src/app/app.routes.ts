import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'discover',
    loadChildren: () => import('./pages/discover/discover.routes').then(m => m.DISCOVER_ROUTES)
  },
  {
    path: 'entertainment',
    loadChildren: () => import('./pages/entertainment/entertainment.routes').then(m => m.ENTERTAINMENT_ROUTES)
  },
  {
    path: 'hotels',
    loadChildren: () => import('./pages/hotels/hotels.routes').then(m => m.HOTELS_ROUTES)
  },
  {
    path: 'transport',
    loadChildren: () => import('./pages/transport/transport.routes').then(m => m.TRANSPORT_ROUTES)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search.component').then(m => m.SearchComponent)
  },
  {
    path: 'legal/privacy',
    loadComponent: () => import('./pages/legal/privacy/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: 'legal/terms',
    loadComponent: () => import('./pages/legal/terms/terms.component').then(m => m.TermsComponent)
  },
  {
    path: 'donate',
    loadComponent: () => import('./pages/donate/donate.component').then(m => m.DonateComponent)
  },
  {
    path: 'donate/thank-you',
    loadComponent: () => import('./pages/donate/thank-you/thank-you.component').then(m => m.ThankYouComponent)
  }
];

