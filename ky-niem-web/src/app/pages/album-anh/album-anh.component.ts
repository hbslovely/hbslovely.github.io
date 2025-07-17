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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadAlbumData();
  }

  private loadAlbumData() {
    this.http.get<any>('assets/data/album-data.json').subscribe({
      next: (data) => {
        this.albumPhotos = data.albumPhotos;
      },
      error: (error) => {
        console.error('Error loading album data:', error);
        this.setFallbackData();
      }
    });
  }

  private setFallbackData() {
    this.albumPhotos = [
      { id: 1, src: 'assets/images/ki-niem/img.png', caption: 'Khoảnh khắc đầu tiên bên nhau' },
      { id: 2, src: 'assets/images/ki-niem/img_1.png', caption: 'Những ngày đầu hẹn hò' },
      { id: 3, src: 'assets/images/ki-niem/img_2.png', caption: 'Chuyến du lịch đáng nhớ' },
      { id: 4, src: 'assets/images/ki-niem/img_3.png', caption: 'Lễ cưới hạnh phúc' }
    ];
  }
}
