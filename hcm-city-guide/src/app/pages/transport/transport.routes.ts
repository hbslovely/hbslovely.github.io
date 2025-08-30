import { Routes } from '@angular/router';

export const TRANSPORT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./transport.component').then(m => m.TransportComponent),
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
      },
      {
        path: 'search',
        loadComponent: () => import('./pages/search/transport-search.component').then(m => m.TransportSearchComponent)
      },
      {
        path: 'ride-hailing',
        loadComponent: () => import('./pages/ride-hailing/ride-hailing.component').then(m => m.RideHailingComponent)
      },
      {
        path: 'public-transport',
        loadComponent: () => import('./pages/public-transport/public-transport.component').then(m => m.PublicTransportComponent)
      },
      {
        path: 'bike-rental',
        loadComponent: () => import('./pages/bike-rental/bike-rental.component').then(m => m.BikeRentalComponent)
      },
      {
        path: 'car-rental',
        loadComponent: () => import('./pages/car-rental/car-rental.component').then(m => m.CarRentalComponent)
      }
    ]
  }
]; 