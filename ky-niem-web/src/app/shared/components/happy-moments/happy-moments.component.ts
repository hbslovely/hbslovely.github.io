import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HappyMoment, Category } from '../../models/love.model';

@Component({
  selector: 'app-happy-moments',
  templateUrl: './happy-moments.component.html',
  styleUrls: ['./happy-moments.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HappyMomentsComponent implements OnInit {
  happyMoments: HappyMoment[] = [
    {
      id: 1,
      title: 'Lần Đầu Gặp Nhau',
      description: 'Khoảnh khắc đầu tiên khi chúng ta gặp nhau tại công ty, một ngày không thể quên.',
      date: '15/03/2023',
      image: 'assets/images/ki-niem/lan-dau-gap-nhau.png',
      emotions: [
        { icon: 'pi-heart', text: 'Rung động' },
        { icon: 'pi-star', text: 'Đặc biệt' }
      ]
    },
    {
      id: 2,
      title: 'Chuyến Du Lịch Đầu Tiên',
      description: 'Chuyến đi Đà Nẵng đầu tiên của chúng ta, nơi chúng ta thực sự hiểu nhau hơn.',
      date: '20/05/2024',
      image: 'assets/images/bucket/DongHuyenKhong_DaNang_Thang5-2024.png',
      emotions: [
        { icon: 'pi-heart', text: 'Hạnh phúc' },
        { icon: 'pi-camera', text: 'Kỷ niệm' }
      ]
    }
  ];

  categories: Category[] = [
    {
      title: 'Những Chuyến Đi',
      icon: 'pi-map-marker',
      count: 5
    },
    {
      title: 'Khoảnh Khắc Đặc Biệt',
      icon: 'pi-heart',
      count: 10
    },
    {
      title: 'Ngày Lễ',
      icon: 'pi-calendar',
      count: 3
    }
  ];

  constructor() {}

  ngOnInit(): void {}
} 