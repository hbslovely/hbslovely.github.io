import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'chao-mung',
    loadChildren: () => import('./pages/chao-mung/chao-mung.routes').then(m => m.CHaoMungRoutes)
  },
  {
    path: 've-chung-toi',
    loadChildren: () => import('./pages/ve-chung-toi/ve-chung-toi.routes').then(m => m.VeChungToiRoutes)
  },
  {
    path: 'thong-tin-vo',
    loadChildren: () => import('./pages/thong-tin-vo/thong-tin-vo.routes').then(m => m.ThongTinVoRoutes)
  },
  {
    path: 'thong-tin-chong',
    loadChildren: () => import('./pages/thong-tin-chong/thong-tin-chong.routes').then(m => m.ThongTinChongRoutes)
  },
  {
    path: 'album-anh',
    loadChildren: () => import('./pages/album-anh/album-anh.routes').then(m => m.ALBUM_ANH_ROUTES)
  },
  {
    path: 'album-anh/:id',
    loadChildren: () => import('./pages/album-anh/album-anh.routes').then(m => m.ALBUM_ANH_ROUTES)
  },
  {
    path: '',
    redirectTo: 'chao-mung',
    pathMatch: 'full'
  }
];
