import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ky-niem',
  imports: [CommonModule],
  templateUrl: './ky-niem.component.html',
  styleUrls: ['./ky-niem.component.scss']
})
export class KyNiemComponent implements OnInit, OnDestroy {
  
  memories: any[] = [];
  timeline: any[] = [];
  loveQuotes: any[] = [];
  loveStatistics: any = {};
  specialMoments: any[] = [];
  ourSongs: any[] = [];
  memoryPlaces: any[] = [];
  meaningfulGifts: any[] = [];
  favoriteFoods: any[] = [];
  futureDreams: any[] = [];
  gratitudeMessages: any[] = [];

  // Live counter properties
  liveCounter = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  
  private counterInterval: any;
  private startDate = new Date('2021-05-09T00:00:00');

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMemoriesData();
    this.startLiveCounter();
  }

  ngOnDestroy() {
    if (this.counterInterval) {
      clearInterval(this.counterInterval);
    }
  }

  private startLiveCounter() {
    // Update immediately
    this.updateCounter();
    
    // Then update every second
    this.counterInterval = setInterval(() => {
      this.updateCounter();
    }, 1000);
  }

  private updateCounter() {
    const now = new Date();
    const timeDiff = now.getTime() - this.startDate.getTime();
    
    this.liveCounter.days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    this.liveCounter.hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.liveCounter.minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    this.liveCounter.seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.style.display = 'none';
    }
  }

  private loadMemoriesData() {
    this.http.get<any>('assets/data/memories-data.json').subscribe({
      next: (data) => {
        this.memories = data.memoriesGallery;
        this.timeline = data.timeline;
        this.loveQuotes = data.loveQuotes || [];
        this.loveStatistics = data.loveStatistics || {};
        this.specialMoments = data.specialMoments || [];
        this.ourSongs = data.ourSongs || [];
        this.memoryPlaces = data.memoryPlaces || [];
        this.meaningfulGifts = data.meaningfulGifts || [];
        this.favoriteFoods = data.favoriteFoods || [];
        this.futureDreams = data.futureDreams || [];
        this.gratitudeMessages = data.gratitudeMessages || [];
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
      { id: 1, src: 'assets/images/ki-niem/lan-dau-gap-nhau.png', description: 'Lần đầu gặp nhau - Khoảnh khắc định mệnh' },
      { id: 2, src: 'assets/images/ki-niem/trao-duyen.png', description: 'Trao duyên - Những ngày đầu yêu nhau' },
      { id: 3, src: 'assets/images/ki-niem/ky-niem-quen-nhau.png', description: 'Kỷ niệm ngày quen nhau' },
      { id: 4, src: 'assets/images/ki-niem/cuoi-hoi.png', description: 'Cưới hỏi - Ngày trọng đại' },
      { id: 5, src: 'assets/images/hinh-cuoi/mang-thai.png', description: 'Mang thai - Chờ đón thiên thần nhỏ' },
      { id: 6, src: 'assets/images/hinh-cuoi/cung-nhau.png', description: 'Cùng nhau - Hạnh phúc mỗi ngày' }
    ];

    this.timeline = [
      {
        phase: "Lần đầu gặp nhau",
        date: "01/2020",
        title: "Khoảnh khắc định mệnh 💫",
        description: "Lần đầu tiên anh và em gặp nhau, đó là một khoảnh khắc diệu kỳ mà cả hai sẽ không bao giờ quên.",
        image: "assets/images/ki-niem/lan-dau-gap-nhau.png",
        icon: "pi pi-eye"
      },
      {
        phase: "Trao duyên",
        date: "02/2020",
        title: "Những ngày đầu yêu nhau 💕",
        description: "Từ những cuộc nói chuyện ban đầu, chúng ta đã dần hiểu và yêu thương nhau.",
        image: "assets/images/ki-niem/trao-duyen.png",
        icon: "pi pi-heart"
      }
    ];

    this.loveQuotes = [];
    this.loveStatistics = {};
    this.specialMoments = [];
    this.ourSongs = [];
    this.memoryPlaces = [];
    this.meaningfulGifts = [];
    this.favoriteFoods = [];
    this.futureDreams = [];
    this.gratitudeMessages = [];
  }
}
