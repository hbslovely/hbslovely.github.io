import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-anh-yeu-thich',
  imports: [CommonModule],
  templateUrl: './anh-yeu-thich.component.html',
  styleUrls: ['./anh-yeu-thich.component.scss']
})
export class AnhYeuThichComponent {
  favoriteImages: any[] = [];

  loadFavorites() {
    const favs = JSON.parse(localStorage.getItem('favoriteImages') || '[]');
    // Ảnh mẫu giống album
    const allImages = [
      { id: 1, src: 'assets/images/ki-niem/ki-niem-1.jpg', title: 'Chuyến đi đầu tiên' },
      { id: 2, src: 'assets/images/ki-niem/ki-niem-2.jpg', title: 'Kỷ niệm 1 năm' },
      { id: 3, src: 'assets/images/ki-niem/ki-niem-3.jpg', title: 'Sinh nhật đáng nhớ' },
      { id: 4, src: 'assets/images/ki-niem/ki-niem-4.jpg', title: 'Khoảnh khắc lãng mạn' },
      { id: 5, src: 'assets/images/ki-niem/ki-niem-5.jpg', title: 'Kỷ niệm đặc biệt' },
      { id: 6, src: 'assets/images/ki-niem/ki-niem-6.jpg', title: 'Hạnh phúc bên nhau' },
      { id: 7, src: 'assets/images/hinh-cuoi/wedding-1.jpg', title: 'Ảnh cưới tuyệt đẹp' },
      { id: 8, src: 'assets/images/hinh-cuoi/wedding-2.jpg', title: 'Ngày cưới hạnh phúc' }
    ];

    this.favoriteImages = allImages.filter(i => favs.includes(i.id));
  }

  constructor() {
    this.loadFavorites();
  }
}
