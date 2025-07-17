import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

interface MemoryPlace {
  name: string;
  date: string;
  image: string;
  description: string;
  emotions: string[];
}

@Component({
  selector: 'app-memory-places',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './memory-places.component.html',
  styleUrls: ['./memory-places.component.scss']
})
export class MemoryPlacesComponent implements OnInit {
  @Input() places: MemoryPlace[] = [
    {
      name: 'Đà Nẵng',
      date: 'Tháng 5, 2024',
      image: 'assets/images/dia-diem/da-nang.png',
      description: 'Chuyến đi đầu tiên của chúng ta tới Đà Nẵng, nơi có những bãi biển đẹp và cầu Rồng lung linh.',
      emotions: ['Hạnh phúc', 'Thư giãn', 'Lãng mạn']
    },
    {
      name: 'Đà Lạt',
      date: 'Tháng 6, 2024',
      image: 'assets/images/dia-diem/da-lat.png',
      description: 'Thành phố ngàn hoa với không khí se lạnh, nơi chúng ta đã có những khoảnh khắc ngọt ngào.',
      emotions: ['Lãng mạn', 'Bình yên', 'Ấm áp']
    },
    {
      name: 'Hạ Long',
      date: 'Tháng 7, 2024',
      image: 'assets/images/dia-diem/vung-tau.png',
      description: 'Vịnh Hạ Long tuyệt đẹp với những hòn đảo đá vôi và mặt nước xanh biếc.',
      emotions: ['Phiêu lưu', 'Thích thú', 'Hạnh phúc']
    },
    {
      name: 'Sapa',
      date: 'Tháng 8, 2024',
      image: 'assets/images/dia-diem/sapa.png',
      description: 'Những ruộng bậc thang tuyệt đẹp và không khí trong lành của vùng núi Tây Bắc.',
      emotions: ['Yên bình', 'Thư thái', 'Gần gũi']
    }
  ];
  
  currentSlide = 0;

  ngOnInit() {
    // Auto-play slides
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  private autoPlayInterval: any;
  private readonly AUTO_PLAY_INTERVAL = 5000; // 5 seconds

  private startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.AUTO_PLAY_INTERVAL);
  }

  private stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  prevSlide() {
    this.stopAutoPlay();
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.places.length - 1; // Loop to last slide
    }
    this.startAutoPlay();
  }

  nextSlide() {
    this.stopAutoPlay();
    if (this.currentSlide < this.places.length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0; // Loop to first slide
    }
    this.startAutoPlay();
  }

  goToSlide(index: number) {
    this.stopAutoPlay();
    this.currentSlide = index;
    this.startAutoPlay();
  }
} 