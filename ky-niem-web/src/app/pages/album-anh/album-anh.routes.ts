import { Routes } from '@angular/router';

export const AlbumAnhRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./album-anh.component').then(m => m.AlbumAnhComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./album-anh.component').then(m => m.AlbumAnhComponent)
  }
]; 