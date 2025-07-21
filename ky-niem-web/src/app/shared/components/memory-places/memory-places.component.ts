import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AlbumGalleryComponent } from '../album-gallery/album-gallery.component';

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
  imports: [CommonModule, ButtonModule, AlbumGalleryComponent],
  templateUrl: './memory-places.component.html',
  styleUrls: ['./memory-places.component.scss']
})
export class MemoryPlacesComponent implements OnInit {
  @Input() places: MemoryPlace[] = [
    {
      name: 'Đà Nẵng',
      date: 'Tháng 5, 2024',
      image: 'assets/images/dia-diem/da-nang.png',
      description: 'Chuyến đi đầu tiên của chúng ta đến Đà Nẵng là một hành trình ngập tràn tiếng cười và những khoảnh khắc lãng mạn bên bờ biển xanh. Cầu Rồng rực rỡ, những buổi tối dạo phố và hương vị hải sản tươi ngon đã để lại trong tim mình bao kỷ niệm khó quên.',
      emotions: ['Hạnh phúc', 'Thư giãn', 'Lãng mạn']
    },
    {
      name: 'Đà Lạt',
      date: 'Tháng 6, 2024',
      image: 'assets/images/dia-diem/da-lat.png',
      description: 'Đà Lạt mộng mơ với không khí se lạnh và những con dốc quanh co đã mang đến cho chúng ta những ngày thật bình yên. Cùng nhau ngắm hoa, thưởng thức ly cà phê nóng và nắm tay dạo quanh hồ Xuân Hương, mọi thứ đều trở nên ngọt ngào hơn khi có em bên cạnh.',
      emotions: ['Lãng mạn', 'Bình yên', 'Ấm áp']
    },
    {
      name: 'Hạ Long',
      date: 'Tháng 7, 2024',
      image: 'assets/images/dia-diem/vung-tau.png',
      description: 'Vịnh Hạ Long hùng vĩ với những hòn đảo đá vôi kỳ vĩ và mặt nước xanh biếc. Chuyến du thuyền giữa thiên nhiên tuyệt đẹp, cùng nhau ngắm hoàng hôn trên boong tàu, đã khiến mình cảm nhận rõ hơn về sự phiêu lưu và hạnh phúc khi được đồng hành cùng em.',
      emotions: ['Phiêu lưu', 'Thích thú', 'Hạnh phúc']
    },
    {
      name: 'Sapa',
      date: 'Tháng 8, 2024',
      image: 'assets/images/dia-diem/sapa.png',
      description: 'Sapa chào đón chúng ta bằng làn sương mờ ảo và những thửa ruộng bậc thang xanh mướt. Những buổi sáng se lạnh, cùng nhau thưởng thức đặc sản vùng cao và ngắm nhìn núi rừng hùng vĩ, đã tạo nên những ký ức thật yên bình và gần gũi.',
      emotions: ['Yên bình', 'Thư thái', 'Gần gũi']
    }
  ];
  
  get albumImages() {
    return this.places.map(place => ({
      src: place.image,
      caption: place.name + (place.date ? ' - ' + place.date : ''),
      name: place.name,
      description: place.description
    }));
  }
  
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