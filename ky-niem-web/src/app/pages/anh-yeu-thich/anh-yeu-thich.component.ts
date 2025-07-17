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
      { id: 1, src: 'https://via.placeholder.com/300x200?text=Ảnh+1', title: 'Kỷ niệm 1' },
      { id: 2, src: 'https://via.placeholder.com/300x200?text=Ảnh+2', title: 'Kỷ niệm 2' },
      { id: 3, src: 'https://via.placeholder.com/300x200?text=Ảnh+3', title: 'Kỷ niệm 3' },
      { id: 4, src: 'https://via.placeholder.com/300x200?text=Ảnh+4', title: 'Kỷ niệm 4' },
      { id: 5, src: 'https://via.placeholder.com/300x200?text=Ảnh+5', title: 'Kỷ niệm 5' }
    ];

    this.favoriteImages = allImages.filter(i => favs.includes(i.id));
  }

  constructor() {
    this.loadFavorites();
  }
}
