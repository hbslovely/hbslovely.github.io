import { Routes } from '@angular/router';

export const HOTELS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./hotels.component').then(m => m.HotelsComponent),
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
      },
      {
        path: 'search',
        loadComponent: () => import('./pages/search/search.component').then(m => m.HotelSearchComponent)
      },
      {
        path: 'hotels',
        loadComponent: () => import('./pages/hotels/hotels-list.component').then(m => m.HotelsListComponent)
      },
      {
        path: 'apartments',
        loadComponent: () => import('./pages/apartments/apartments.component').then(m => m.ApartmentsComponent)
      },
      {
        path: 'resorts',
        loadComponent: () => import('./pages/resorts/resorts.component').then(m => m.ResortsComponent)
      },
      {
        path: 'spas',
        loadComponent: () => import('./pages/spas/spas.component').then(m => m.SpasComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/detail/hotel-detail.component').then(m => m.HotelDetailComponent)
      }
    ]
  }
]; 