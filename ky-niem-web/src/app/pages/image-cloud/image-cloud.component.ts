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
    { text: 'Kỷ niệm', size: 24 },
    { text: 'Tình yêu', size: 18 },
    { text: 'Hạnh phúc', size: 20 },
    { text: 'Bạn bè', size: 16 },
    { text: 'Du lịch', size: 22 },
    { text: 'Gia đình', size: 18 },
    { text: 'Khoảnh khắc', size: 20 },
  ];
}
