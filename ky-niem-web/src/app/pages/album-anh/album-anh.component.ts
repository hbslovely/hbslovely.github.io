import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PhotoItem {
  id: number;
  url: string;
  title: string;
  description?: string;
  width: number;
  height: number;
}

@Component({
  selector: 'app-album-anh',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="album-container">
      <div class="album-title">
        <h1>Album Ảnh Của Chúng Mình</h1>
      </div>
      
      <div class="masonry-grid">
        <div class="masonry-item" *ngFor="let photo of photos">
          <div class="photo-card" (click)="openPhoto(photo)">
            <img [src]="photo.url" 
                 [alt]="photo.title"
                 loading="lazy">
            <div class="photo-content">
              <h3>{{photo.title}}</h3>
              <p *ngIf="photo.description">{{photo.description}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./album-anh.component.scss']
})
export class AlbumAnhComponent implements OnInit {
  photos: PhotoItem[] = [
    {
      id: 1,
      url: 'assets/images/hinh-cuoi/cung-nhau.png',
      title: 'Cùng Nhau',
      description: 'Những khoảnh khắc hạnh phúc bên nhau',
      width: 4,
      height: 3
    },
    {
      id: 2,
      url: 'assets/images/hinh-cuoi/mang-thai.png',
      title: 'Mang Thai',
      description: 'Khoảnh khắc đáng nhớ',
      width: 3,
      height: 4
    },
    {
      id: 3,
      url: 'assets/images/ki-niem/cuoi-hoi.png',
      title: 'Cưới Hỏi',
      description: 'Ngày trọng đại của chúng mình',
      width: 16,
      height: 9
    },
    {
      id: 4,
      url: 'assets/images/ki-niem/ky-niem-quen-nhau.png',
      title: 'Kỷ Niệm Quen Nhau',
      description: 'Những ngày đầu tiên',
      width: 4,
      height: 3
    },
    {
      id: 5,
      url: 'assets/images/ki-niem/lan-dau-gap-nhau.png',
      title: 'Lần Đầu Gặp Nhau',
      description: 'Khoảnh khắc định mệnh',
      width: 3,
      height: 4
    },
    {
      id: 6,
      url: 'assets/images/ki-niem/trao-duyen.png',
      title: 'Trao Duyên',
      description: 'Ngày về chung một nhà',
      width: 16,
      height: 9
    }
  ];

  openPhoto(photo: PhotoItem) {
    // Implement photo viewer later
    console.log('Opening photo:', photo);
  }

  ngOnInit() {
    // Load more photos if needed
  }
}
