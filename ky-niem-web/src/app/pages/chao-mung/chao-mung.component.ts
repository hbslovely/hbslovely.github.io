import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-chao-mung',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './chao-mung.component.html',
  styleUrls: ['./chao-mung.component.scss']
})
export class ChaoMungComponent implements OnInit, OnDestroy {
  memories: any[] = [];
  timeline: any[] = [];
  currentText: string = '';
  textIndex: number = 0;
  charIndex: number = 0;
  Object = Object;

  welcomeTexts: string[] = [
    'Chào Mừng Đến Với Trang Kỷ Niệm Của Chúng Mình 💑',
    'Nơi Lưu Giữ Những Khoảnh Khắc Đẹp 💕',
    'Hành Trình Yêu Thương Của Hai Đứa 💝'
  ];

  liveCounter = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  loveStatistics: any = {};
  specialMoments: any[] = [];
  ourSongs: any[] = [];
  memoryPlaces: any[] = [];
  loveQuotes: any[] = [];
  meaningfulGifts: any[] = [];
  favoriteFoods: any[] = [];
  futureDreams: any[] = [];
  
  private counterInterval: any;
  private startDate = new Date('2021-05-09T00:00:00');

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMemoriesData();
    this.startLiveCounter();
    this.typeText();
  }

  ngOnDestroy() {
    if (this.counterInterval) {
      clearInterval(this.counterInterval);
    }
  }

  getStatLabel(key: string): string {
    const labels: { [key: string]: string } = {
      daysTogether: 'Ngày Bên Nhau',
      photosShared: 'Ảnh Đã Chụp',
      tripsTaken: 'Chuyến Đi',
      smilesShared: 'Nụ Cười',
      hugsTight: 'Cái Ôm',
      laughsLoud: 'Tiếng Cười',
      tearsOfJoy: 'Giọt Nước Mắt Hạnh Phúc',
      dreamsShared: 'Ước Mơ Chung'
    };
    return labels[key] || key;
  }

  private startLiveCounter() {
    this.updateCounter();
    this.counterInterval = setInterval(() => {
      this.updateCounter();
    }, 1000);
  }

  private updateCounter() {
    const now = new Date();
    const diff = now.getTime() - this.startDate.getTime();
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    this.liveCounter = {
      days,
      hours,
      minutes,
      seconds
    };
  }

  typeText() {
    if (this.charIndex < this.welcomeTexts[this.textIndex].length) {
      this.currentText = this.welcomeTexts[this.textIndex].slice(0, this.charIndex + 1);
      this.charIndex++;
      setTimeout(() => this.typeText(), 100);
    } else {
      setTimeout(() => {
        this.charIndex = 0;
        this.textIndex = (this.textIndex + 1) % this.welcomeTexts.length;
        this.currentText = '';
        this.typeText();
      }, 3000);
    }
  }

  private loadMemoriesData() {
    this.http.get<any>('assets/data/memories-data.json').subscribe({
      next: (data) => {
        this.memories = data.memoriesGallery;
        this.timeline = data.timeline;
        this.loveStatistics = data.loveStatistics;
        this.specialMoments = data.specialMoments;
        this.ourSongs = data.ourSongs;
        this.memoryPlaces = data.memoryPlaces;
        this.loveQuotes = data.loveQuotes;
        this.meaningfulGifts = data.meaningfulGifts;
        this.favoriteFoods = data.favoriteFoods;
        this.futureDreams = data.futureDreams;
      },
      error: (error) => {
        console.error('Error loading memories data:', error);
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

    this.loveStatistics = {
      daysTogether: '1,531',
      photosShared: '12,457',
      tripsTaken: '18',
      smilesShared: '∞',
      hugsTight: '6,000+',
      laughsLoud: 'Vô số',
      tearsOfJoy: 'Rất nhiều',
      dreamsShared: 'Tất cả'
    };

    this.specialMoments = [
      {
        title: 'Lần đầu nói "Anh yêu em"',
        description: 'Khoảnh khắc thiêng liêng khi những từ ngữ ấm áp nhất được thổ lộ',
        date: '09/05/2021',
        icon: 'pi pi-heart-fill',
        color: '#e91e63'
      },
      {
        title: 'Chuyến du lịch đầu tiên',
        description: 'Những bước chân đầu tiên khám phá thế giới bên nhau',
        date: '07/2021',
        icon: 'pi pi-map',
        color: '#2196f3'
      }
    ];

    this.ourSongs = [
      {
        title: 'Hẹn Ước Từ Hư Vô',
        artist: 'Mỹ Tâm',
        description: 'Bài hát về những lời hẹn ước ngọt ngào và tình yêu lãng mạn',
        moment: 'Khi nghe nhạc cùng nhau'
      },
      {
        title: 'Chờ Anh Nhé',
        artist: 'Hoàng Dũng',
        description: 'Lời hứa sẽ luôn chờ đợi nhau dù ở đâu, dù bao lâu',
        moment: 'Lúc xa nhau'
      }
    ];

    this.memoryPlaces = [
      {
        name: 'Vũng Tàu',
        description: 'Bãi biển đầu tiên chúng ta cùng nhau đến',
        significance: 'Chuyến đi biển đầu tiên',
        icon: 'pi pi-sun',
        image: 'assets/images/dia-diem/vung-tau.jpg'
      }
    ];

    this.loveQuotes = [
      {
        quote: 'Trong vô vàn con người trên thế giới này, anh đã tìm thấy em - người duy nhất làm cho trái tim anh rung động.',
        author: 'Ba Heo Nhỏ',
        icon: 'pi pi-heart'
      }
    ];

    this.meaningfulGifts = [
      {
        gift: 'Chiếc nhẫn đầu tiên',
        occasion: 'Kỷ niệm 1 năm yêu nhau',
        meaning: 'Lời hứa sẽ bên nhau mãi mãi',
        emotion: 'Xúc động và hạnh phúc'
      }
    ];

    this.favoriteFoods = [
      {
        dish: 'Phở bò',
        story: 'Món ăn đầu tiên anh nấu cho em khi em ốm',
        feeling: 'Ấm lòng'
      }
    ];

    this.futureDreams = [
      {
        dream: 'Du lịch khắp thế giới',
        description: 'Cùng nhau khám phá 50 quốc gia',
        timeline: '10 năm tới',
        icon: 'pi pi-globe'
      }
    ];
  }
} 