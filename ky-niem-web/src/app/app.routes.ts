import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'chao-mung',
    loadComponent: () => import('./pages/chao-mung/chao-mung.component').then(m => m.ChaoMungComponent)
  },
  {
    path: 've-chung-toi',
    loadComponent: () => import('./pages/ve-chung-toi/ve-chung-toi.component').then(m => m.VeChungToiComponent)
  },
  {
    path: 'thong-tin-vo',
    loadComponent: () => import('./pages/thong-tin-vo/thong-tin-vo.component').then(m => m.ThongTinVoComponent)
  },
  {
    path: 'thong-tin-chong',
    loadComponent: () => import('./pages/thong-tin-chong/thong-tin-chong.component').then(m => m.ThongTinChongComponent)
  },
  {
    path: 'album-anh',
    loadComponent: () => import('./pages/album-anh/album-anh.component').then(m => m.AlbumAnhComponent)
  },
  {
    path: 'tips-vo-chong',
    loadComponent: () => import('./pages/tips-vo-chong/tips-vo-chong.component').then(m => m.TipsVoChongComponent)
  },
  {
    path: '',
    redirectTo: 'chao-mung',
    pathMatch: 'full'
  }
];
