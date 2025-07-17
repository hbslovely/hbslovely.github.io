import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-cloud',
  imports: [CommonModule],
  templateUrl: './image-cloud.component.html',
  styleUrls: ['./image-cloud.component.scss']
})
export class ImageCloudComponent {
  tags = [
    { text: 'Tình Yêu', size: 28 },
    { text: 'Kỷ Niệm', size: 24 },
    { text: 'Hạnh Phúc', size: 26 },
    { text: 'Lãng Mạn', size: 22 },
    { text: 'Ngọt Ngào', size: 20 },
    { text: 'Gắn Bó', size: 18 },
    { text: 'Ước Mơ', size: 24 },
    { text: 'Tương Lai', size: 22 },
    { text: 'Cùng Nhau', size: 20 },
    { text: 'Mãi Mãi', size: 26 },
    { text: 'Trân Trọng', size: 18 },
    { text: 'Yêu Thương', size: 24 }
  ];
}
