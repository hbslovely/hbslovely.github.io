import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlbumAnhComponent } from './pages/album-anh/album-anh.component';
import { AnhYeuThichComponent } from './pages/anh-yeu-thich/anh-yeu-thich.component';
import { KyNiemComponent } from './pages/ky-niem/ky-niem.component';
import { DongThoiGianComponent } from './pages/dong-thoi-gian/dong-thoi-gian.component';
import { ImageCloudComponent } from './pages/image-cloud/image-cloud.component';
import { ThongDiepComponent } from './pages/thong-diep/thong-diep.component';
import { VeChungToiComponent } from './pages/ve-chung-toi/ve-chung-toi.component';
import { ThongTinChongComponent } from './pages/thong-tin-chong/thong-tin-chong.component';
import { ThongTinVoComponent } from './pages/thong-tin-vo/thong-tin-vo.component';

export const routes: Routes = [
  { path: '', redirectTo: '/album-anh', pathMatch: 'full' },
  { path: 'album-anh', component: AlbumAnhComponent },
  { path: 'anh-yeu-thich', component: AnhYeuThichComponent },
  { path: 'ky-niem', component: KyNiemComponent },
  { path: 'dong-thoi-gian', component: DongThoiGianComponent },
  { path: 'image-cloud', component: ImageCloudComponent },
  { path: 'thong-diep', component: ThongDiepComponent },
  { path: 'thong-tin-chong', component: ThongTinChongComponent },
  { path: 'thong-tin-vo', component: ThongTinVoComponent },
  { path: 've-chung-toi', component: VeChungToiComponent },
  { path: '**', redirectTo: '/album-anh' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
