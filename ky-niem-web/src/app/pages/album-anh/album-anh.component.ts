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
    { id: 1, src: 'https://via.placeholder.com/300x200?text=Ảnh+1', title: 'Kỷ niệm 1', favorite: false },
    { id: 2, src: 'https://via.placeholder.com/300x200?text=Ảnh+2', title: 'Kỷ niệm 2', favorite: false },
    { id: 3, src: 'https://via.placeholder.com/300x200?text=Ảnh+3', title: 'Kỷ niệm 3', favorite: false },
    { id: 4, src: 'https://via.placeholder.com/300x200?text=Ảnh+4', title: 'Kỷ niệm 4', favorite: false },
    { id: 5, src: 'https://via.placeholder.com/300x200?text=Ảnh+5', title: 'Kỷ niệm 5', favorite: false }
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
