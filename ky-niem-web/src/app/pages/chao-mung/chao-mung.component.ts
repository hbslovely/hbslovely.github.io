import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CarouselModule } from 'primeng/carousel';
import { ParallaxHeaderComponent } from '../../shared/components/parallax-header/parallax-header.component';
import { LoveStatisticsComponent } from '../../shared/components/love-statistics/love-statistics.component';
import { SpecialMomentsComponent } from '../../shared/components/special-moments/special-moments.component';
import { OurSongsComponent } from '../../shared/components/our-songs/our-songs.component';
import { MemoryPlacesComponent } from '../../shared/components/memory-places/memory-places.component';
import { LoveQuotesComponent } from '../../shared/components/love-quotes/love-quotes.component';
import { MeaningfulGiftsComponent } from '../../shared/components/meaningful-gifts/meaningful-gifts.component';
import { FavoriteFoodsComponent } from '../../shared/components/favorite-foods/favorite-foods.component';
import { MemoryGalleryComponent } from '../../shared/components/memory-gallery/memory-gallery.component';
import { GratitudeMessagesComponent } from '../../shared/components/gratitude-messages/gratitude-messages.component';

@Component({
  selector: 'app-chao-mung',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    ParallaxHeaderComponent,
    LoveStatisticsComponent,
    SpecialMomentsComponent,
    OurSongsComponent,
    MemoryPlacesComponent,
    LoveQuotesComponent,
    MeaningfulGiftsComponent,
    FavoriteFoodsComponent,
    MemoryGalleryComponent,
    GratitudeMessagesComponent
  ],
  templateUrl: './chao-mung.component.html',
  styleUrls: ['./chao-mung.component.scss']
})
export class ChaoMungComponent implements OnInit {
  memories: any[] = [];
  timeline: any[] = [];
  loveStatistics: any = {};
  specialMoments: any[] = [];
  ourSongs: any[] = [];
  memoryPlaces: any[] = [];
  loveQuotes: any[] = [];
  meaningfulGifts: any[] = [];
  favoriteFoods: any[] = [];
  
  // Array for floating hearts
  floatingHearts = Array(15).fill(0).map((_, i) => i + 1);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMemoriesData();
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

    this.loveStatistics = {
      daysTogether: '1,531',
      photosShared: '12,457',
      tripsTaken: '18',
      smilesShared: '∞',
      hugsTight: '6,000+',
      laughsLoud: 'Vô số',
      tearsOfJoy: 'Rất nhiều',
      comfortMoments: 'Mỗi ngày'
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
        name: 'Đồng Huyền Không - Đà Nẵng',
        date: 'Tháng 5, 2024',
        image: '/assets/images/bucket/DongHuyenKhong_DaNang_Thang5-2024.png',
        description: 'Chuyến đi Đà Nẵng đầu tiên của chúng ta',
        emotions: ['Bình yên', 'Hạnh phúc', 'Lãng mạn']
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
        dish: 'Cơm tấm',
        person: 'Chồng',
        story: 'Món ăn truyền thống mà anh yêu thích nhất, đặc biệt là vào buổi sáng',
        feeling: 'Hạnh phúc'
      }
    ];
  }

  // Carousel properties
  currentSlide = 0;
  currentTranslate = 0;
  autoSlideInterval: any;

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  resetAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
    this.startAutoSlide();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.memoryPlaces.length;
    this.updateTranslate();
    this.resetAutoSlide();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.memoryPlaces.length) % this.memoryPlaces.length;
    this.updateTranslate();
    this.resetAutoSlide();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.updateTranslate();
    this.resetAutoSlide();
  }

  private updateTranslate() {
    // Calculate the translation percentage based on the current slide
    const slideWidth = 100; // 100%
    this.currentTranslate = -this.currentSlide * slideWidth;
  }
} 