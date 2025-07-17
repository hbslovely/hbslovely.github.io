import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ky-niem',
  imports: [CommonModule],
  templateUrl: './ky-niem.component.html',
  styleUrls: ['./ky-niem.component.scss']
})
export class KyNiemComponent implements OnInit {
  
  memories: any[] = [];
  timeline: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMemoriesData();
  }

  private loadMemoriesData() {
    this.http.get<any>('assets/data/memories-data.json').subscribe({
      next: (data) => {
        this.memories = data.memoriesGallery;
        this.timeline = data.timeline;
      },
      error: (error) => {
        console.error('Error loading memories data:', error);
        // Fallback data in case of error
        this.setFallbackData();
      }
    });
  }

  private setFallbackData() {
    this.memories = [
      { id: 1, src: 'assets/images/ki-niem/img.png', description: 'Lần đầu gặp nhau - Khoảnh khắc định mệnh' },
      { id: 2, src: 'assets/images/ki-niem/img_1.png', description: 'Trao duyên - Những ngày đầu yêu nhau' },
      { id: 3, src: 'assets/images/ki-niem/img_2.png', description: 'Kỷ niệm ngày quen nhau' },
      { id: 4, src: 'assets/images/ki-niem/img_3.png', description: 'Cưới hỏi - Ngày trọng đại' },
      { id: 5, src: 'assets/images/hinh-cuoi/img1.png', description: 'Mang thai - Chờ đón thiên thần nhỏ' },
      { id: 6, src: 'assets/images/hinh-cuoi/img2.png', description: 'Cùng nhau - Hạnh phúc mỗi ngày' }
    ];

    this.timeline = [
      {
        phase: "Lần đầu gặp nhau",
        date: "01/2020",
        title: "Khoảnh khắc định mệnh 💫",
        description: "Lần đầu tiên anh và em gặp nhau, đó là một khoảnh khắc diệu kỳ mà cả hai sẽ không bao giờ quên.",
        image: "assets/images/ki-niem/img.png",
        icon: "pi pi-eye"
      },
      {
        phase: "Trao duyên",
        date: "02/2020",
        title: "Những ngày đầu yêu nhau 💕",
        description: "Từ những cuộc nói chuyện ban đầu, chúng ta đã dần hiểu và yêu thương nhau.",
        image: "assets/images/ki-niem/img_1.png",
        icon: "pi pi-heart"
      }
    ];
  }
}
