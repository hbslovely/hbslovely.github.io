import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LoveStatistics {
  daysTogether: string;
  photosShared: string;
  tripsTaken: string;
  smilesShared: string;
  hugsTight: string;
  laughsLoud: string;
  tearsOfJoy: string;
  comfortMoments: string;
}

@Component({
  selector: 'app-love-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './love-statistics.component.html',
  styleUrls: ['./love-statistics.component.scss']
})
export class LoveStatisticsComponent {
  @Input() statistics: LoveStatistics = {
    daysTogether: '0',
    photosShared: '0',
    tripsTaken: '0',
    smilesShared: '0',
    hugsTight: '0',
    laughsLoud: '0',
    tearsOfJoy: '0',
    comfortMoments: '0'
  };

  Object = Object;

  getStatDescription(key: string): string {
    const descriptions: { [key: string]: string } = {
      daysTogether: 'Số ngày bên nhau',
      photosShared: 'Số ảnh đã chụp cùng nhau',
      tripsTaken: 'Số chuyến đi đã trải qua',
      smilesShared: 'Số nụ cười đã trao nhau',
      hugsTight: 'Số vòng tay ấm áp',
      laughsLoud: 'Số tiếng cười rộn rã',
      tearsOfJoy: 'Số giọt nước mắt hạnh phúc',
      comfortMoments: 'Số khoảnh khắc an ủi'
    };
    return descriptions[key] || key;
  }

  getStatTitle(key: string): string {
    const titles: { [key: string]: string } = {
      daysTogether: 'Thời Gian Yêu',
      photosShared: 'Khoảnh Khắc Đẹp',
      tripsTaken: 'Hành Trình Tình Yêu',
      smilesShared: 'Nụ Cười Hạnh Phúc',
      hugsTight: 'Vòng Tay Ấm Áp',
      laughsLoud: 'Tiếng Cười Rộn Rã',
      tearsOfJoy: 'Niềm Vui Ngập Tràn',
      comfortMoments: 'Khoảnh Khắc Bình Yên'
    };
    return titles[key] || key;
  }

  getStatIcon(key: string): string {
    const icons: { [key: string]: string } = {
      daysTogether: 'pi pi-calendar',
      photosShared: 'pi pi-camera',
      tripsTaken: 'pi pi-map',
      smilesShared: 'pi pi-heart-fill',
      hugsTight: 'pi pi-users',
      laughsLoud: 'pi pi-star-fill',
      tearsOfJoy: 'pi pi-heart',
      comfortMoments: 'pi pi-home'
    };
    return icons[key] || 'pi pi-heart';
  }

  getStatLabel(key: string): string {
    const labels: { [key: string]: string } = {
      daysTogether: 'Ngày bên nhau',
      photosShared: 'Ảnh đã chụp',
      tripsTaken: 'Chuyến đi',
      smilesShared: 'Nụ cười',
      hugsTight: 'Cái ôm',
      laughsLoud: 'Tiếng cười',
      tearsOfJoy: 'Giọt nước mắt hạnh phúc',
      comfortMoments: 'Sự an ủi'
    };
    return labels[key] || key;
  }

  getStatImage(key: string): string {
    const images: { [key: string]: string } = {
      daysTogether: 'assets/images/gallery/ben-nhau.png',
      photosShared: 'assets/images/gallery/so-anh-da-chup.png',
      hugsTight: 'assets/images/gallery/cai-om.png',
      laughsLoud: 'assets/images/gallery/nu-cuoi.png',
      tearsOfJoy: 'assets/images/gallery/giot-nuoc-mat-hanh-phuc.png',
      tripsTaken: 'assets/images/gallery/chuyen-di.png',
      smilesShared: 'assets/images/gallery/ngay-ben-nhau.png',
      comfortMoments: 'assets/images/gallery/su-an-ui.png'
    };
    return images[key] || '';
  }
}
