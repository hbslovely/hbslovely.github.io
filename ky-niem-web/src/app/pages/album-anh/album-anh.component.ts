import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-album-anh',
  imports: [
    ButtonModule,
    CommonModule
  ],
  templateUrl: './album-anh.component.html',
  styleUrls: [ './album-anh.component.scss' ]
})
export class AlbumAnhComponent {
  images = [
    { id: 1, src: 'assets/images/ki-niem/ki-niem-1.jpg', title: 'Chuyến đi đầu tiên', favorite: false },
    { id: 2, src: 'assets/images/ki-niem/ki-niem-2.jpg', title: 'Kỷ niệm 1 năm', favorite: false },
    { id: 3, src: 'assets/images/ki-niem/ki-niem-3.jpg', title: 'Sinh nhật đáng nhớ', favorite: false },
    { id: 4, src: 'assets/images/ki-niem/ki-niem-4.jpg', title: 'Khoảnh khắc lãng mạn', favorite: false },
    { id: 5, src: 'assets/images/ki-niem/ki-niem-5.jpg', title: 'Kỷ niệm đặc biệt', favorite: false },
    { id: 6, src: 'assets/images/ki-niem/ki-niem-6.jpg', title: 'Hạnh phúc bên nhau', favorite: false },
    { id: 7, src: 'assets/images/hinh-cuoi/wedding-1.jpg', title: 'Ảnh cưới tuyệt đẹp', favorite: false },
    { id: 8, src: 'assets/images/hinh-cuoi/wedding-2.jpg', title: 'Ngày cưới hạnh phúc', favorite: false }
  ];

  toggleFavorite(img: any) {
    img.favorite = !img.favorite;
    this.saveFavorites();
  }

  saveFavorites() {
    const favs = this.images.filter(i => i.favorite).map(i => i.id);
    localStorage.setItem('favoriteImages', JSON.stringify(favs));
  }

  loadFavorites() {
    const favs = JSON.parse(localStorage.getItem('favoriteImages') || '[]');
    this.images.forEach(i => i.favorite = favs.includes(i.id));
  }

  constructor() {
    this.loadFavorites();
  }
}
