import { Routes } from '@angular/router';

export const TipsVoChongRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tips-vo-chong.component').then(m => m.TipsVoChongComponent)
  }
]; 