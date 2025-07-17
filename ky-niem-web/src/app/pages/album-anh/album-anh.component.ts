import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-album-anh',
  imports: [CommonModule],
  templateUrl: './album-anh.component.html',
  styleUrls: ['./album-anh.component.scss']
})
export class AlbumAnhComponent implements OnInit {
  albumPhotos: any[] = [];
  showLightbox: boolean = false;
  currentImageIndex: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadAlbumData();
  }

  openLightbox(index: number) {
    this.currentImageIndex = index;
    this.showLightbox = true;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closeLightbox() {
    this.showLightbox = false;
    document.body.style.overflow = 'auto'; // Restore scrolling
  }

  nextImage() {
    if (this.currentImageIndex < this.albumPhotos.length - 1) {
      this.currentImageIndex++;
    }
  }

  previousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  private loadAlbumData() {
    this.http.get<any>('assets/data/album-data.json').subscribe({
      next: (data) => {
        this.albumPhotos = data.photos || [];
      },
      error: (error) => {
        console.error('Error loading album data:', error);
        // Fallback data
        this.albumPhotos = [
          { id: 1, src: 'assets/images/ki-niem/lan-dau-gap-nhau.png', caption: 'Lần đầu gặp nhau - Khoảnh khắc định mệnh' },
          { id: 2, src: 'assets/images/ki-niem/trao-duyen.png', caption: 'Trao duyên - Những ngày đầu yêu nhau' },
          { id: 3, src: 'assets/images/ki-niem/ky-niem-quen-nhau.png', caption: 'Kỷ niệm ngày quen nhau' },
          { id: 4, src: 'assets/images/ki-niem/cuoi-hoi.png', caption: 'Cưới hỏi - Ngày trọng đại' },
          { id: 5, src: 'assets/images/hinh-cuoi/mang-thai.png', caption: 'Mang thai - Chờ đón thiên thần nhỏ' },
          { id: 6, src: 'assets/images/hinh-cuoi/cung-nhau.png', caption: 'Cùng nhau - Hạnh phúc mỗi ngày' }
        ];
      }
    });
  }
}
